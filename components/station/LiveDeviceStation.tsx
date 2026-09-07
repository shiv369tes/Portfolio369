"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Laptop,
  Server,
  Radio,
  Music,
  Code2,
  Disc,
  Moon,
  CheckCircle2,
  Gamepad2,
} from "lucide-react";

const DISCORD_USER_ID = "1273998848985010249";

interface LanyardActivity {
  id?: string;
  name: string;
  type: number; // 0: Game, 1: Stream, 2: Listen, 3: Watch, 4: Custom, 5: Compete
  state?: string;
  details?: string;
  application_id?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  buttons?: string[];
}

interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    display_name?: string;
    global_name?: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_web: boolean;
  listening_to_spotify: boolean;
  spotify: {
    track_id: string;
    timestamps: { start: number; end: number };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  } | null;
  activities: LanyardActivity[];
}

function resolveAssetUrl(activity?: LanyardActivity | null, spotifyArt?: string | null): string | null {
  if (spotifyArt) return spotifyArt;
  if (!activity || !activity.assets?.large_image) return null;
  const img = activity.assets.large_image;

  if (img.startsWith("mp:external/")) {
    const rawPath = img.replace("mp:external/", "");
    return `https://media.discordapp.net/external/${rawPath}`;
  }
  if (img.startsWith("spotify:")) {
    const spotifyId = img.replace("spotify:", "");
    return `https://i.scdn.co/image/${spotifyId}`;
  }
  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`;
  }
  return null;
}

export function LiveDeviceStation() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial REST Fetch
  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
          setIsConnected(true);
        }
      })
      .catch((err) => console.error("Presence fetch error:", err));
  }, []);

  // 2. Real-time WebSocket Connection
  useEffect(() => {
    let reconnectTimeout: NodeJS.Timeout;

    const connectWs = () => {
      const ws = new WebSocket("wss://api.lanyard.rest/socket");
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          const { op, d, t } = msg;

          // Opcode 1: Hello -> start heartbeat & subscribe
          if (op === 1) {
            const interval = d.heartbeat_interval || 30000;
            if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
            heartbeatTimerRef.current = setInterval(() => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 3 }));
              }
            }, interval);

            ws.send(
              JSON.stringify({
                op: 2,
                d: { subscribe_to_id: DISCORD_USER_ID },
              })
            );
          }

          // Dispatch Events
          if (op === 0) {
            if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
              setData(d);
            }
          }
        } catch (e) {
          console.error("Presence parse error:", e);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
        reconnectTimeout = setTimeout(connectWs, 5000);
      };

      ws.onerror = () => {
        ws.close();
      };
    };

    connectWs();

    return () => {
      clearTimeout(reconnectTimeout);
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  // Real-time track progress ticker (updates every second)
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Extract Real Activities
  const spotify = data?.spotify || null;
  const musicActivity =
    data?.activities.find(
      (a) =>
        a.type === 2 ||
        a.name.toLowerCase().includes("music") ||
        a.name.toLowerCase().includes("metrolist") ||
        a.name.toLowerCase().includes("youtube") ||
        a.name.toLowerCase().includes("spotify")
    ) || null;

  const vscodeActivity =
    data?.activities.find(
      (a) =>
        a.name.toLowerCase().includes("visual studio") ||
        a.name.toLowerCase().includes("code") ||
        a.name.toLowerCase().includes("cursor")
    ) || null;

  const gameActivity =
    data?.activities.find(
      (a) =>
        a.type === 0 &&
        !a.name.toLowerCase().includes("code") &&
        !a.name.toLowerCase().includes("studio")
    ) || null;

  const customStatusActivity = data?.activities.find((a) => a.type === 4) || null;

  // Real Device State Flags
  const isMobileActive = data?.active_on_discord_mobile || false;
  const isDesktopActive = data?.active_on_discord_desktop || !!vscodeActivity || !!gameActivity;
  const isMusicPlaying = !!spotify || !!musicActivity;

  // User Profile
  const avatarUrl = data?.discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${data.discord_user.avatar}.png?size=128`
    : null;

  const displayName = data?.discord_user?.display_name || data?.discord_user?.global_name || "Shivam Kedare";
  const username = data?.discord_user?.username || "shiv369tes";
  const discordStatus = data?.discord_status || "offline";

  // Song duration & current position calculation (100% Real)
  let trackTitle = "";
  let trackArtist = "";
  let trackAlbum = "";
  let trackProgress = 0;
  let trackTotalSec = 0;
  let trackCurSec = 0;
  let coverArt = resolveAssetUrl(musicActivity, spotify?.album_art_url);

  if (spotify) {
    trackTitle = spotify.song;
    trackArtist = spotify.artist;
    trackAlbum = spotify.album;
    const totalMs = spotify.timestamps.end - spotify.timestamps.start;
    const curMs = Math.max(0, Math.min(totalMs, currentTime - spotify.timestamps.start));
    trackTotalSec = Math.floor(totalMs / 1000);
    trackCurSec = Math.floor(curMs / 1000);
    trackProgress = totalMs > 0 ? (curMs / totalMs) * 100 : 0;
  } else if (musicActivity) {
    trackTitle = musicActivity.details || musicActivity.name;
    trackArtist = musicActivity.state || "";
    trackAlbum = musicActivity.assets?.large_text || "";
    if (musicActivity.timestamps?.start && musicActivity.timestamps?.end) {
      const totalMs = musicActivity.timestamps.end - musicActivity.timestamps.start;
      const curMs = Math.max(0, Math.min(totalMs, currentTime - musicActivity.timestamps.start));
      trackTotalSec = Math.floor(totalMs / 1000);
      trackCurSec = Math.floor(curMs / 1000);
      trackProgress = totalMs > 0 ? (curMs / totalMs) * 100 : 0;
    } else if (musicActivity.timestamps?.start) {
      trackCurSec = Math.floor((currentTime - musicActivity.timestamps.start) / 1000);
      trackTotalSec = Math.max(trackCurSec + 60, 240);
      trackProgress = Math.min(100, (trackCurSec / trackTotalSec) * 100);
    }
  }

  const formatSec = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <section id="workbench" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#EDE4D9] bg-[#FAF6F1]">
      <div className="max-w-6xl mx-auto">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3ECE4] border border-[#E2D5C6] text-xs font-semibold text-[#7A746D] mb-4">
            <Radio className="w-3.5 h-3.5 text-[#C4604A] animate-pulse" />
            <span>Live Activity Stream</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1816] tracking-tight">
            Live Activity &amp; Status
          </h2>

          <p className="text-sm sm:text-base text-[#5E5854] mt-3 leading-relaxed">
            Real-time status, active coding projects, and music playback streaming live from my devices.
          </p>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-[#566449] animate-pulse" : "bg-[#C4604A]"}`} />
            <span className="text-[#7A746D]">
              {isConnected ? "LIVE FEED CONNECTED" : "CONNECTING..."}
            </span>
          </div>
        </div>

        {/* ── Central Presence Banner ── */}
        <div className="mb-8 p-4 sm:p-5 rounded-lg bg-[#FDFCFA] border border-[#EDE4D9] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-12 h-12 rounded-full border-2 border-[#D4C3AF] object-cover shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#1A1816] text-[#FAF6F1] font-serif font-black flex items-center justify-center text-base border-2 border-[#D4C3AF]">
                  OT
                </div>
              )}
              <span
                className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                  discordStatus === "online"
                    ? "bg-[#566449]"
                    : discordStatus === "idle"
                    ? "bg-[#D97706]"
                    : discordStatus === "dnd"
                    ? "bg-[#C4604A]"
                    : "bg-[#928B87]"
                }`}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base text-[#1A1816]">{displayName}</span>
                <span className="text-xs font-mono text-[#7A746D]">@{username}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase ${
                    discordStatus === "online"
                      ? "bg-[#566449]/10 text-[#566449]"
                      : discordStatus === "idle"
                      ? "bg-[#D97706]/10 text-[#D97706]"
                      : discordStatus === "dnd"
                      ? "bg-[#C4604A]/10 text-[#C4604A]"
                      : "bg-[#928B87]/10 text-[#928B87]"
                  }`}
                >
                  {discordStatus}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5E5854] mt-0.5 italic">
                {customStatusActivity?.state ? (
                  <span>&ldquo;{customStatusActivity.state}&rdquo;</span>
                ) : discordStatus !== "offline" ? (
                  <span>&ldquo;Online &amp; active across personal devices&rdquo;</span>
                ) : (
                  <span>&ldquo;Currently away / in low-power standby&rdquo;</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#1A1816] bg-[#F3ECE4] px-3.5 py-1.5 rounded-full border border-[#EDE4D9] self-start sm:self-auto shrink-0">
            <span
              className={`w-2 h-2 rounded-full ${
                discordStatus !== "offline" ? "bg-[#566449] animate-pulse" : "bg-[#928B87]"
              }`}
            />
            <span className="font-semibold">
              {discordStatus === "offline"
                ? "All Devices in Standby"
                : `${isMobileActive ? "Mobile" : ""} ${isDesktopActive ? "• Desktop PC" : ""} Active`}
            </span>
          </div>
        </div>

        {/* ── Real Hardware Device Cards ── */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* ── 1. REALME 11 PRO 5G ── */}
          <div
            className={`p-6 rounded-lg border shadow-sm flex flex-col justify-between transition-all ${
              isMobileActive || isMusicPlaying
                ? "bg-[#FDFCFA] border-[#EDE4D9] hover:border-[#D4C3AF]"
                : "bg-[#F7F2EB]/60 border-[#E8DFC8] opacity-80"
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE4D9]">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center ${
                      isMobileActive || isMusicPlaying
                        ? "bg-[#C4604A]/10 text-[#C4604A]"
                        : "bg-[#928B87]/10 text-[#928B87]"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#1A1816]">
                      realme 11 Pro 5G
                    </h3>
                    <p className="text-xs text-[#7A746D]">
                      Dimensity 7050 · Android 14
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4">
                {isMusicPlaying ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#C4604A]/10 text-[#C4604A] text-xs font-semibold">
                    <Music className="w-3.5 h-3.5 animate-bounce" />
                    <span>Streaming Audio</span>
                  </span>
                ) : isMobileActive ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#566449]/10 text-[#566449] text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active on Mobile</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#928B87]/15 text-[#7A746D] text-xs font-medium">
                    <Moon className="w-3 h-3" />
                    <span>Standby · Screen Locked</span>
                  </span>
                )}
              </div>

              {/* Body Card */}
              {isMusicPlaying && trackTitle ? (
                <div className="mt-4 p-4 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-3">
                  <div className="flex items-center gap-3">
                    {/* Cover Art / Spinning Vinyl */}
                    <div className="relative w-12 h-12 rounded-full bg-[#1A1816] flex items-center justify-center shadow shrink-0 border border-[#D4C3AF] overflow-hidden">
                      {coverArt ? (
                        <img
                          src={coverArt}
                          alt={trackTitle}
                          className="w-full h-full object-cover animate-spin"
                          style={{ animationDuration: "8s" }}
                        />
                      ) : (
                        <Disc
                          className="w-7 h-7 text-[#C4604A] animate-spin"
                          style={{ animationDuration: "6s" }}
                        />
                      )}
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FAF6F1] absolute shadow-inner" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-serif font-bold text-sm text-[#1A1816] truncate">
                        {trackTitle}
                      </h4>
                      {trackArtist && (
                        <p className="text-xs text-[#5E5854] truncate">
                          {trackArtist}
                        </p>
                      )}
                      {trackAlbum && (
                        <p className="text-[11px] text-[#928B87] truncate">
                          {trackAlbum}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Scrubber (only shown if real track duration exists) */}
                  {trackTotalSec > 0 && (
                    <div className="space-y-1">
                      <div className="w-full h-1.5 rounded-full bg-[#EDE4D9] overflow-hidden">
                        <div
                          className="h-full bg-[#C4604A] rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.max(0, trackProgress))}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] font-mono text-[#7A746D]">
                        <span>{formatSec(trackCurSec)}</span>
                        <span>{formatSec(trackTotalSec)}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : isMobileActive ? (
                <div className="mt-4 p-4 rounded bg-[#FAF6F1] border border-[#EDE4D9] text-xs text-[#5E5854] space-y-1">
                  <p className="font-serif font-bold text-sm text-[#1A1816]">Mobile Active</p>
                  <p className="text-[11.5px] text-[#7A746D]">Connected via Wi-Fi / 5G SA</p>
                </div>
              ) : (
                <div className="mt-4 p-4 rounded bg-[#FAF6F1]/50 border border-[#EDE4D9]/60 text-xs text-[#7A746D] space-y-1">
                  <p className="font-medium text-[#5E5854]">No active audio stream.</p>
                  <p className="text-[11.5px]">Updates live when listening to music or active on phone.</p>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-[#EDE4D9] text-xs text-[#7A746D] flex justify-between font-mono">
              <span>{isMobileActive || isMusicPlaying ? "● Live" : "○ Idle"}</span>
              <span>Mobile Device</span>
            </div>
          </div>

          {/* ── 2. GAMING & DEV RIG ── */}
          <div
            className={`p-6 rounded-lg border shadow-sm flex flex-col justify-between transition-all ${
              isDesktopActive
                ? "bg-[#FDFCFA] border-[#EDE4D9] hover:border-[#D4C3AF]"
                : "bg-[#F7F2EB]/60 border-[#E8DFC8] opacity-80"
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE4D9]">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center ${
                      isDesktopActive
                        ? "bg-[#1A1816] text-[#FAF6F1]"
                        : "bg-[#928B87]/10 text-[#928B87]"
                    }`}
                  >
                    <Laptop className="w-4 h-4 text-[#C4604A]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#1A1816]">
                      Gaming &amp; Dev PC
                    </h3>
                    <p className="text-xs text-[#7A746D]">
                      RTX 2060S · 32GB RAM · Ryzen 7 2600X
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4">
                {vscodeActivity ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#566449]/10 text-[#566449] text-xs font-semibold">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Coding in {vscodeActivity.name}</span>
                  </span>
                ) : gameActivity ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#C4604A]/10 text-[#C4604A] text-xs font-semibold">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>Playing {gameActivity.name}</span>
                  </span>
                ) : isDesktopActive ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#566449]/10 text-[#566449] text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Desktop Workstation Online</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#928B87]/15 text-[#7A746D] text-xs font-medium">
                    <Moon className="w-3 h-3" />
                    <span>Standby · Desk Rig Asleep</span>
                  </span>
                )}
              </div>

              {/* Body Card */}
              {vscodeActivity ? (
                <div className="mt-4 p-4 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-2 text-xs">
                  {vscodeActivity.state && (
                    <div>
                      <span className="text-[#928B87] block text-[11px] uppercase tracking-wider font-mono">
                        Workspace / Project
                      </span>
                      <span className="font-serif font-bold text-sm text-[#1A1816]">
                        {vscodeActivity.state}
                      </span>
                    </div>
                  )}

                  {vscodeActivity.details && (
                    <div>
                      <span className="text-[#928B87] block text-[11px] uppercase tracking-wider font-mono">
                        Active Buffer
                      </span>
                      <span className="font-mono text-[#C4604A] font-semibold text-[11.5px] block truncate">
                        {vscodeActivity.details}
                      </span>
                    </div>
                  )}
                </div>
              ) : gameActivity ? (
                <div className="mt-4 p-4 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-2 text-xs">
                  <div>
                    <span className="text-[#928B87] block text-[11px] uppercase tracking-wider font-mono">
                      Active Title
                    </span>
                    <span className="font-serif font-bold text-sm text-[#1A1816]">
                      {gameActivity.name}
                    </span>
                  </div>
                  {gameActivity.details && (
                    <p className="text-[#5E5854] text-[11.5px]">{gameActivity.details}</p>
                  )}
                </div>
              ) : isDesktopActive ? (
                <div className="mt-4 p-4 rounded bg-[#FAF6F1] border border-[#EDE4D9] text-xs text-[#5E5854] space-y-1">
                  <p className="font-serif font-bold text-sm text-[#1A1816]">Desktop Active</p>
                  <p className="text-[11.5px] text-[#7A746D]">Windows 11 · Desktop Workstation</p>
                </div>
              ) : (
                <div className="mt-4 p-4 rounded bg-[#FAF6F1]/50 border border-[#EDE4D9]/60 text-xs text-[#7A746D] space-y-1">
                  <p className="font-medium text-[#5E5854]">Workstation is powered down.</p>
                  <p className="text-[11.5px]">Updates live when editing in VS Code or gaming.</p>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-[#EDE4D9] flex items-center justify-between text-xs text-[#7A746D] font-mono">
              <span>{isDesktopActive ? "● Active" : "○ Off"}</span>
              <span>Primary Rig</span>
            </div>
          </div>

          {/* ── 3. VETERAN PC ── */}
          <div className="p-6 rounded-lg bg-[#F7F2EB]/60 border border-[#E8DFC8] shadow-sm flex flex-col justify-between opacity-80 hover:opacity-100 transition-all">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE4D9]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-[#928B87]/10 text-[#7A746D] flex items-center justify-center">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#1A1816]">
                      Veteran PC
                    </h3>
                    <p className="text-xs text-[#7A3B3B] font-medium">
                      &quot;i better not say it, it&apos;s very old&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#928B87]/15 text-[#7A746D] text-xs font-medium">
                  <Moon className="w-3 h-3" />
                  <span>Standby Node</span>
                </span>
              </div>

              {/* Body Card */}
              <div className="mt-4 p-4 rounded bg-[#FAF6F1]/50 border border-[#EDE4D9]/60 space-y-2 text-xs text-[#7A746D]">
                <div>
                  <span className="text-[#928B87] block text-[11px] uppercase tracking-wider font-mono">
                    Hardware Role
                  </span>
                  <p className="text-xs text-[#5E5854] font-medium leading-relaxed">
                    Dedicated secondary server for scheduled background builds and tasks.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EDE4D9] text-xs text-[#7A746D] font-mono flex justify-between">
              <span>○ Standby</span>
              <span>Secondary Machine</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
