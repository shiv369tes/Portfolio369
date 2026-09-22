import React from 'react'
import Hero from './components/Hero'
import BookScene from './components/BookScene'
import PortfolioSections from './components/PortfolioSections'
import './App.css'

export default function App() {
  return (
    <main className="portfolio-app">
      <Hero />
      <div id="book-scroll-root" className="book-scroll-root">
        <BookScene />
        <PortfolioSections />
      </div>
    </main>
  )
}
