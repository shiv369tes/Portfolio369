import React, { useEffect, useRef, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'
import './BookScene.css'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const norm = (v, a, b) => clamp((v-a)/(b-a), 0, 1)
const ease = t => t < .5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2

function getTargets(p) {
  let x, y, z
  if (p < .18) {
    x = 1.1; y = 3.4 * (1-ease(norm(p,0,.18))); z = 0
  } else if (p < .45) {
    x = 1.0; y = Math.sin(p*15)*.05; z = 0
  } else if (p < .58) {
    const t = ease(norm(p,.45,.58)); x = THREE.MathUtils.lerp(1.0,-1.25,t); y = .05; z = .1*t
  } else {
    x = -1.25; y = Math.sin(p*13)*.05; z = 0
  }

  let rotY
  if (p < .18) rotY = .38 * (1-ease(norm(p,0,.18)))
  else if (p < .72) rotY = THREE.MathUtils.lerp(0, Math.PI*2.2, norm(p,.18,.72))
  else rotY = Math.PI*2.2 + THREE.MathUtils.lerp(0,Math.PI*.85,norm(p,.72,1))

  return { x, y, z, rotX: .05, rotY, rotZ: p < .18 ? .12*(1-norm(p,0,.18)) : .01 }
}

function setupModel(node, scene) {
  node.scale.set(1,1,1); node.position.set(0,0,0); node.rotation.set(0,0,0)
  const box = new THREE.Box3().setFromObject(node)
  const size = new THREE.Vector3(); box.getSize(size)
  const max = Math.max(size.x,size.y,size.z)
  if (!max) return
  node.scale.setScalar(1.65/max)
  const box2 = new THREE.Box3().setFromObject(node)
  const center = new THREE.Vector3(); box2.getCenter(center)
  node.position.set(-center.x,-center.y,-center.z)
  node.rotation.x = Math.PI/2
  scene.traverse(child => { if(child.isMesh){ child.castShadow=true; child.receiveShadow=true } })
}

function BookModel({ progressRef }) {
  const group = useRef()
  const inner = useRef()
  const done = useRef(false)
  const { scene } = useGLTF('/models/deathnote.glb')
  const cb = useCallback(node => {
    inner.current=node
    if(node && !done.current){done.current=true;setupModel(node,scene)}
  },[scene])

  useEffect(()=>{ if(inner.current && !done.current){done.current=true;setupModel(inner.current,scene)} },[scene])

  useFrame(()=>{
    if(!group.current)return
    const t=getTargets(progressRef.current), g=group.current, k=.105
    g.position.x=THREE.MathUtils.lerp(g.position.x,t.x,k)
    g.position.y=THREE.MathUtils.lerp(g.position.y,t.y,k)
    g.position.z=THREE.MathUtils.lerp(g.position.z,t.z,k)
    g.rotation.x=THREE.MathUtils.lerp(g.rotation.x,t.rotX,k)
    g.rotation.y=THREE.MathUtils.lerp(g.rotation.y,t.rotY,k)
    g.rotation.z=THREE.MathUtils.lerp(g.rotation.z,t.rotZ,k)
  })

  return <group ref={group} position={[1.1,3.4,0]}><group ref={cb}><primitive object={scene}/></group></group>
}

function Lights(){return <>
  <ambientLight intensity={.35} color="#d9d0bd"/>
  <directionalLight position={[0,6,5]} intensity={2.1} color="#f0dfc0" castShadow/>
  <directionalLight position={[0,4,-5]} intensity={1.5} color="#a7b6cf"/>
  <pointLight position={[2,3,4]} intensity={1.2} color="#b58a62" distance={12}/>
  <pointLight position={[-3,2,-2]} intensity={.8} color="#6b0000" distance={10}/>
</>}

export default function BookScene(){
  const progressRef=useRef(0)
  useEffect(()=>{
    const root=document.getElementById('book-scroll-root')
    if(!root)return
    const onScroll=()=>{
      const rect=root.getBoundingClientRect()
      const start=window.scrollY + rect.top
      const total=root.offsetHeight-window.innerHeight
      progressRef.current=total>0?clamp((window.scrollY-start)/total,0,1):0
    }
    window.addEventListener('scroll',onScroll,{passive:true}); onScroll()
    return()=>window.removeEventListener('scroll',onScroll)
  },[])

  return <div className="bs-wrapper">
    <div className="bs-sticky">
      <Canvas className="bs-canvas" camera={{position:[0,0,5.3],fov:43}} gl={{antialias:true,alpha:true}} shadows>
        <Lights/>
        <Float speed={.35} rotationIntensity={.03} floatIntensity={.08}><BookModel progressRef={progressRef}/></Float>
        <ContactShadows position={[0,-1.2,0]} opacity={.35} scale={7} blur={2.5} far={5}/>
        <Environment preset="night"/>
      </Canvas>
      <div className="bs-vignette"/>
      <div className="bs-scanline"/>
    </div>
  </div>
}

useGLTF.preload('/models/deathnote.glb')
