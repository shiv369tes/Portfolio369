"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Laptop,
  Radio,
  Music,
  Code2,
  Disc,
  Moon,
  CheckCircle2,
  Gamepad2,
  Tv,
  Play,
  ExternalLink,
  Instagram,
  Youtube,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

const DISCORD_USER_ID = "1273998848985010249";

interface LanyardActivity {
  id?: string;
  name: string;
  type: number; // 0: Game/Code, 1: Stream, 2: Listen, 3: Watch, 4: Custom, 5: Compete
  state?: string;
  details?: string;
  application_id?: string;
  platform?: string;
  details_url?: string;
  state_url?: string;
  large_url?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    large_url?: string;
    small_image?: string;
    small_text?: string;
    small_url?: string;
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

function resolveAsset(img?: string | null, appId?: string | null): string | null {
  if (!img) return null;
  if (img.startsWith("mp:external/")) {
    const rawPath = img.replace("mp:external/", "");
    const httpsIdx = rawPath.indexOf("https/");
    if (httpsIdx !== -1) {
      return "https://" + rawPath.slice(httpsIdx + 6);
    }
    const httpIdx = rawPath.indexOf("http/");
    if (httpIdx !== -1) {
      return "http://" + rawPath.slice(httpIdx + 5);
    }
    return `https://media.discordapp.net/external/${rawPath}`;
  }
  if (img.startsWith("spotify:")) {
    const spotifyId = img.replace("spotify:", "");
    return `https://i.scdn.co/image/${spotifyId}`;
  }
  if (appId) {
    return `https://cdn.discordapp.com/app-assets/${appId}/${img}.png`;
  }
  return null;
}

interface ParsedActivity {
  id: string;
  category: "code" | "video" | "music" | "game" | "stream" | "other";
  title: string;
  subtitle?: string;
  service: string;
  platform: "desktop" | "mobile" | "any";
  iconType: "code" | "video" | "music" | "game" | "stream";
  badgeColor: string;
  largeImage?: string | null;
  smallImage?: string | null;
  largeText?: string;
  smallText?: string;
  details?: string;
  state?: string;
  url?: string;
  channelUrl?: string;
  buttons?: Array<{ label: string; url: string }>;
  progress?: {
    start?: number;
    end?: number;
    currentSec?: number;
    totalSec?: number;
    percent?: number;
  };
}

const formatSec = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
};

function parseLanyardActivity(
  act: LanyardActivity,
  currentTime: number,
  index: number
): ParsedActivity {
  const nameLower = act.name.toLowerCase();
  let category: ParsedActivity["category"] = "other";
  let iconType: ParsedActivity["iconType"] = "code";
  let service = act.name;

  if (
    act.type === 0 &&
    (nameLower === "code" ||
      nameLower.includes("visual studio") ||
      nameLower.includes("cursor") ||
      nameLower.includes("antigravity") ||
      (act.assets?.large_text && act.assets.large_text.toLowerCase().includes("editing")) ||
      (act.details && act.details.toLowerCase().includes("problems found")))
  ) {
    category = "code";
    iconType = "code";
    service = act.assets?.small_text || (nameLower.includes("antigravity") ? "Antigravity IDE" : "VS Code");
  }
  else if (
    act.type === 3 ||
    (nameLower === "youtube" && act.type !== 2) ||
    nameLower.includes("twitch") ||
    nameLower.includes("netflix")
  ) {
    category = "video";
    iconType = "video";
    service = nameLower.includes("youtube") ? "YouTube" : act.name;
  }
  else if (
    act.type === 2 ||
    nameLower.includes("spotify") ||
    nameLower.includes("music") ||
    nameLower.includes("metrolist")
  ) {
    category = "music";
    iconType = "music";
    service = nameLower.includes("metrolist")
      ? "Metrolist"
      : nameLower.includes("spotify")
      ? "Spotify"
      : nameLower.includes("youtube")
      ? "YouTube Music"
      : act.name;
  }
  else if (act.type === 0) {
    category = "game";
    iconType = "game";
    service = act.name;
  }
  else if (act.type === 1) {
    category = "stream";
    iconType = "stream";
    service = act.name;
  }

  const largeImg = resolveAsset(act.assets?.large_image, act.application_id);
  const smallImg = resolveAsset(act.assets?.small_image, act.application_id);

  let title = act.details || act.name;
  let subtitle = act.state || "";

  if (category === "video") {
    title = act.details || act.name;
    subtitle = act.state || "";
  } else if (category === "music") {
    title = act.details || act.name;
    subtitle = act.state || "";
  } else if (category === "code") {
    title = act.details || "In Workspace";
    subtitle = act.state || act.assets?.large_text || "Editing Code";
  }

  let progress: ParsedActivity["progress"] = undefined;
  if (act.timestamps?.start && act.timestamps?.end) {
    const totalMs = act.timestamps.end - act.timestamps.start;
    const curMs = Math.max(0, Math.min(totalMs, currentTime - act.timestamps.start));
    const totalSec = Math.floor(totalMs / 1000);
    const currentSec = Math.floor(curMs / 1000);
    const percent = totalMs > 0 ? (curMs / totalMs) * 100 : 0;
    progress = { start: act.timestamps.start, end: act.timestamps.end, totalSec, currentSec, percent };
  } else if (act.timestamps?.start) {
    const currentSec = Math.floor((currentTime - act.timestamps.start) / 1000);
    progress = { start: act.timestamps.start, currentSec };
  }

  let buttons: Array<{ label: string; url: string }> = [];
  const primaryUrl = act.details_url || act.assets?.large_url || "";

  if (act.buttons && act.buttons.length > 0) {
    buttons = act.buttons.map((btn) => {
      let url = primaryUrl;
      const bLower = btn.toLowerCase();
      if (bLower.includes("youtube music")) {
        url = `https://music.youtube.com/search?q=${encodeURIComponent(title + " " + subtitle)}`;
      } else if (bLower.includes("youtube")) {
        url = primaryUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`;
      } else if (bLower.includes("metrolist")) {
        url = "https://metrolist.app";
      } else if (bLower.includes("repository") || bLower.includes("repo") || bLower.includes("github")) {
        url = "https://github.com/shiv369tes";
      } else if (bLower.includes("channel") && act.state_url) {
        url = act.state_url;
      }
      return { label: btn, url: url || primaryUrl || "#" };
    });
  } else {
    if (category === "code") {
      buttons = [{ label: "View Repository", url: "https://github.com/shiv369tes" }];
    } else if (category === "video" && primaryUrl) {
      buttons = [{ label: "Watch on YouTube", url: primaryUrl }];
    } else if (category === "music") {
      buttons = [
        {
          label: "Listen on YouTube Music",
          url: `https://music.youtube.com/search?q=${encodeURIComponent(title + " " + subtitle)}`,
        },
      ];
    }
  }

  return {
    id: act.id || `${category}-${act.name}-${index}`,
    category,
    title,
    subtitle,
    service,
    platform: (act.platform as any) || (category === "code" || category === "video" ? "desktop" : "any"),
    iconType,
    badgeColor:
      category === "code"
        ? "#566449"
        : category === "video"
        ? "#C4604A"
        : category === "music"
        ? "#7A3B3B"
        : "#D97706",
    largeImage: largeImg,
    smallImage: smallImg,
    largeText: act.assets?.large_text,
    smallText: act.assets?.small_text,
    details: act.details,
    state: act.state,
    url: primaryUrl,
    channelUrl: act.state_url,
    buttons,
    progress,
  };
}

function renderActivityWidget(act: ParsedActivity) {
  if (act.category === "music") {
    return (
      <div key={act.id} className="p-3.5 rounded-lg bg-[#FAF6F1] border border-[#EDE4D9] space-y-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-[#1A1816] flex items-center justify-center shadow shrink-0 border border-[#D4C3AF] overflow-hidden">
            {act.largeImage ? (
              <img
                src={act.largeImage}
                alt={act.title}
                className="w-full h-full object-cover animate-spin"
                style={{ animationDuration: "8s" }}
              />
            ) : (
              <Disc
                className="w-6 h-6 text-[#C4604A] animate-spin"
                style={{ animationDuration: "6s" }}
              />
            )}
            <div className="w-2 h-2 rounded-full bg-[#FAF6F1] absolute shadow-inner" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-serif font-bold text-xs text-[#1A1816] truncate">
              {act.title}
            </h4>
            {act.subtitle && (
              <p className="text-[11px] text-[#5E5854] truncate">
                {act.subtitle}
              </p>
            )}
            <p className="text-[10px] text-[#928B87] truncate">
              {act.service}
            </p>
          </div>
        </div>

        {act.progress?.totalSec ? (
          <div className="space-y-1 pt-0.5">
            <div className="w-full h-1.5 rounded-full bg-[#EDE4D9] overflow-hidden">
              <div
                className="h-full bg-[#C4604A] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, act.progress.percent || 0))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10.5px] font-mono text-[#7A746D]">
              <span>{formatSec(act.progress.currentSec || 0)}</span>
              <span>{formatSec(act.progress.totalSec)}</span>
            </div>
          </div>
        ) : null}

        {act.buttons && act.buttons.length > 0 && (
          <div className="pt-2 border-t border-[#EDE4D9]/80">
            <div className={`grid ${act.buttons.slice(0, 2).length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-2`}>
              {act.buttons.slice(0, 2).map((btn) => (
                <a
                  key={btn.label}
                  href={btn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded bg-[#F3ECE4] hover:bg-[#E2D5C6] text-[#1A1816] text-[11px] font-mono font-medium transition-colors border border-[#E2D5C6] text-center"
                >
                  <span className="truncate">{btn.label.replace("Listen on ", "").replace("Visit ", "")}</span>
                  <ExternalLink className="w-3 h-3 text-[#7A746D] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (act.category === "video") {
    return (
      <div key={act.id} className="p-3.5 rounded-lg bg-[#FAF6F1] border border-[#EDE4D9] space-y-3 shadow-2xs">
        <div className="flex items-start gap-3">
          {act.largeImage ? (
            <div className="relative w-16 aspect-video rounded overflow-hidden border border-[#D4C3AF] shrink-0 bg-black shadow-xs">
              <img
                src={act.largeImage}
                alt={act.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 text-white drop-shadow fill-white" />
              </div>
            </div>
          ) : (
            <div className="w-12 h-8 rounded bg-[#C4604A]/10 text-[#C4604A] flex items-center justify-center shrink-0 border border-[#C4604A]/20">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <a
              href={act.url || undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif font-bold text-xs text-[#1A1816] hover:text-[#C4604A] transition-colors line-clamp-2 leading-snug"
            >
              {act.title}
            </a>
            {act.subtitle && (
              <a
                href={act.channelUrl || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#5E5854] hover:text-[#1A1816] hover:underline block truncate mt-0.5"
              >
                {act.subtitle}
              </a>
            )}
          </div>
        </div>

        {act.progress?.totalSec ? (
          <div className="space-y-1">
            <div className="w-full h-1.5 rounded-full bg-[#EDE4D9] overflow-hidden">
              <div
                className="h-full bg-[#C4604A] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, act.progress.percent || 0))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10.5px] font-mono text-[#7A746D]">
              <span>{formatSec(act.progress.currentSec || 0)}</span>
              <span>{formatSec(act.progress.totalSec)}</span>
            </div>
          </div>
        ) : null}

        {act.buttons && act.buttons.length > 0 && (
          <div className="pt-2 border-t border-[#EDE4D9]/80">
            <a
              href={act.buttons[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-[#C4604A] text-white hover:bg-[#A8493A] text-[11px] font-mono font-medium transition-colors shadow-xs text-center"
            >
              <span>{act.buttons[0].label}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    );
  }

  if (act.category === "code") {
    return (
      <div key={act.id} className="p-3.5 rounded-lg bg-[#FAF6F1] border border-[#EDE4D9] space-y-3 shadow-2xs">
        <div className="flex items-center gap-3">
          {act.largeImage ? (
            <div className="relative shrink-0 w-10 h-10 rounded bg-[#1A1816] p-1 border border-[#4A4541] flex items-center justify-center shadow-xs">
              <img
                src={act.largeImage}
                alt={act.largeText || "Code file"}
                className="w-7 h-7 object-contain"
                title={act.largeText}
              />
              {act.smallImage && (
                <img
                  src={act.smallImage}
                  alt={act.smallText || "IDE"}
                  className="w-3.5 h-3.5 rounded-full absolute -bottom-1 -right-1 border border-white bg-white p-0.5"
                  title={act.smallText}
                />
              )}
            </div>
          ) : (
            <div className="w-10 h-10 rounded bg-[#566449]/10 text-[#566449] flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="font-serif font-bold text-xs text-[#1A1816] truncate">
                {act.title}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#566449]/15 text-[#566449] shrink-0 font-semibold">
                {act.service}
              </span>
            </div>
            <p className="font-mono text-[11px] text-[#C4604A] truncate mt-0.5 font-medium">
              {act.subtitle}
            </p>
          </div>
        </div>

        <div className="p-2 rounded bg-[#F3ECE4]/60 border border-[#EDE4D9]/80 flex items-center justify-between text-[10.5px] font-mono text-[#5E5854]">
          <span>Antigravity Buffer</span>
          <span className="text-[#566449] font-semibold">● 0 Problems</span>
        </div>

        {act.buttons && act.buttons.length > 0 && (
          <div className="pt-2 border-t border-[#EDE4D9]/80">
            <a
              href={act.buttons[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-[#1A1816] text-[#FAF6F1] hover:bg-[#C4604A] text-[11px] font-mono font-medium transition-colors shadow-xs text-center"
            >
              <span>{act.buttons[0].label}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div key={act.id} className="p-3.5 rounded-lg bg-[#FAF6F1] border border-[#EDE4D9] space-y-3 shadow-2xs">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[#928B87] block text-[10px] uppercase tracking-wider font-mono">
            {act.service} Active
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#C4604A] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4604A] animate-pulse" />
            <span>Live Session</span>
          </span>
        </div>
        <h4 className="font-serif font-bold text-xs text-[#1A1816]">
          {act.title}
        </h4>
        {act.subtitle && (
          <p className="text-[#5E5854] text-[11px]">{act.subtitle}</p>
        )}
      </div>

      {act.buttons && act.buttons.length > 0 && (
        <div className="pt-2 border-t border-[#EDE4D9]/80">
          <a
            href={act.buttons[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-[#1A1816] text-[#FAF6F1] hover:bg-[#C4604A] text-[11px] font-mono font-medium transition-colors text-center"
          >
            <span>{act.buttons[0].label}</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      )}
    </div>
  );
}

export function LiveDeviceStation() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [selectedDesktopActivityId, setSelectedDesktopActivityId] = useState<string | null>(null);
  const [selectedMobileActivityId, setSelectedMobileActivityId] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    let reconnectTimeout: NodeJS.Timeout;
    const connectWs = () => {
      const ws = new WebSocket("wss://api.lanyard.rest/socket");
      wsRef.current = ws;
      ws.onopen = () => setIsConnected(true);
      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.op === 1) {
            const interval = msg.d.heartbeat_interval || 30000;
            if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
            heartbeatTimerRef.current = setInterval(() => {
              if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ op: 3 }));
            }, interval);
            ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_USER_ID } }));
          }
          if (msg.op === 0 && (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE")) setData(msg.d);
        } catch (e) { console.error("Presence parse error:", e); }
      };
      ws.onclose = () => {
        setIsConnected(false);
        if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
        reconnectTimeout = setTimeout(connectWs, 5000);
      };
      ws.onerror = () => ws.close();
    };
    connectWs();
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
      clearTimeout(reconnectTimeout);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const allParsedActivities: ParsedActivity[] = [];
  if (data?.spotify) {
    const s = data.spotify;
    const totalMs = s.timestamps.end - s.timestamps.start;
    const curMs = Math.max(0, Math.min(totalMs, currentTime - s.timestamps.start));
    allParsedActivities.push({
      id: `spotify-${s.track_id}`,
      category: "music",
      title: s.song,
      subtitle: s.artist,
      service: "Spotify",
      platform: "any",
      iconType: "music",
      badgeColor: "#566449",
      largeImage: s.album_art_url,
      largeText: s.album,
      details: s.song,
      state: s.artist,
      buttons: [{ label: "Listen on Spotify", url: `https://open.spotify.com/track/${s.track_id}` }],
      progress: {
        start: s.timestamps.start,
        end: s.timestamps.end,
        totalSec: Math.floor(totalMs / 1000),
        currentSec: Math.floor(curMs / 1000),
        percent: totalMs > 0 ? (curMs / totalMs) * 100 : 0,
      },
    });
  }
  (data?.activities || []).forEach((act, idx) => {
    if (act.type !== 4) allParsedActivities.push(parseLanyardActivity(act, currentTime, idx));
  });

  const customStatusActivity = data?.activities.find((a) => a.type === 4) || null;
  const isMobileActive = data?.active_on_discord_mobile || false;
  const isDesktopActive = data?.active_on_discord_desktop || false;
  const desktopActivities: ParsedActivity[] = [];
  const mobileActivities: ParsedActivity[] = [];

  allParsedActivities.forEach((act) => {
    if (act.platform === "desktop") {
      desktopActivities.push(act);
    } else if (act.platform === "mobile") {
      mobileActivities.push(act);
    } else {
      // Platform is unspecified or "any" (e.g. Spotify)
      if (isMobileActive && !isDesktopActive) {
        mobileActivities.push(act);
      } else if (isMobileActive && isDesktopActive) {
        // Both devices active: if desktop has coding/video, route ambient music to mobile
        const desktopHasNonMusic = desktopActivities.some((d) => d.category !== "music");
        if (desktopHasNonMusic && act.category === "music") {
          mobileActivities.push(act);
        } else {
          desktopActivities.push(act);
        }
      } else {
        desktopActivities.push(act);
      }
    }
  });
  const activeDesktopActivity = desktopActivities.find((a) => a.id === selectedDesktopActivityId) || desktopActivities[0] || null;
  const activeMobileActivity = mobileActivities.find((a) => a.id === selectedMobileActivityId) || mobileActivities[0] || null;
  const avatarUrl = data?.discord_user?.avatar ? `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${data.discord_user.avatar}.png?size=128` : null;
  const displayName = "Shivam Kedare";
  const professionalTitle = "Web Developer & Software Systems Engineer";
  const discordHandle = data?.discord_user?.username || "shiv.369";
  const discordStatus = data?.discord_status || "offline";

  return (
    <section id="workbench" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#EDE4D9] bg-[#FAF6F1]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3ECE4] border border-[#E2D5C6] text-xs font-semibold text-[#7A746D] mb-4">
            <Radio className="w-3.5 h-3.5 text-[#C4604A] animate-pulse" />
            <span>Live Activity Stream</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1816] tracking-tight">
            Live Activity &amp; Status
          </h2>
          <p className="text-sm sm:text-base text-[#5E5854] mt-3 leading-relaxed">
            Real-time status, active coding projects, and media streaming live across personal devices.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-[#566449] animate-pulse" : "bg-[#C4604A]"}`} />
            <span className="text-[#7A746D]">{isConnected ? "LIVE FEED CONNECTED" : "CONNECTING..."}</span>
          </div>
        </div>

        {/* ── Central Presence Beacon Banner ── */}
        <div className="mb-8 p-5 sm:p-6 rounded-xl bg-[#FDFCFA] border border-[#EDE4D9] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Avatar with dynamic radar ping */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#C4604A] via-[#D4C3AF] to-[#566449] shadow-sm">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-full h-full rounded-full object-cover bg-[#1A1816]"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#1A1816] text-[#FAF6F1] font-serif font-black flex items-center justify-center text-lg">
                    OT
                  </div>
                )}
              </div>
              <span
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
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

            {/* Author Identity & Custom Status */}
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-serif font-black text-lg sm:text-xl text-[#1A1816] tracking-tight">
                  {displayName}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#EDE4D9]/80 text-[#5E5854] border border-[#D4C3AF]/60 font-medium">
                  {professionalTitle}
                </span>
                <span
                  className={`text-[10.5px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-bold flex items-center gap-1.5 ${
                    discordStatus === "online"
                      ? "bg-[#566449]/10 text-[#566449]"
                      : discordStatus === "idle"
                      ? "bg-[#D97706]/10 text-[#D97706]"
                      : discordStatus === "dnd"
                      ? "bg-[#C4604A]/10 text-[#C4604A]"
                      : "bg-[#928B87]/15 text-[#7A746D]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      discordStatus !== "offline" ? "bg-current animate-pulse" : "bg-current"
                    }`}
                  />
                  <span>{discordStatus === "online" ? "Active Now" : discordStatus}</span>
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#7A746D] mt-1 font-mono flex-wrap">
                <span>Discord Handle: @{discordHandle}</span>
                <span>•</span>
                <span>Location: Mumbai, IN (IST)</span>
                {customStatusActivity?.state && (
                  <>
                    <span>•</span>
                    <span className="text-[#C4604A] italic font-sans font-medium truncate max-w-[320px]">
                      &ldquo;{customStatusActivity.state}&rdquo;
                    </span>
                  </>
                )}
              </div>

              {/* Real-time Simultaneous Process Ribbon */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {allParsedActivities.length > 0 ? (
                  allParsedActivities.map((act) => (
                    <span
                      key={act.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium truncate max-w-[260px] shadow-2xs transition-all hover:scale-[1.02]"
                      style={{
                        backgroundColor: `${act.badgeColor}12`,
                        color: act.badgeColor,
                        border: `1px solid ${act.badgeColor}30`,
                      }}
                    >
                      {act.iconType === "code" && <Code2 className="w-3.5 h-3.5 shrink-0" />}
                      {act.iconType === "video" && <Tv className="w-3.5 h-3.5 shrink-0" />}
                      {act.iconType === "music" && <Music className="w-3.5 h-3.5 shrink-0" />}
                      {act.iconType === "game" && <Gamepad2 className="w-3.5 h-3.5 shrink-0" />}
                      {act.iconType === "stream" && <Radio className="w-3.5 h-3.5 shrink-0" />}
                      <span className="truncate">
                        {act.category === "code"
                          ? `Coding: ${act.subtitle || act.title}`
                          : act.category === "video"
                          ? `Watching: ${act.title}`
                          : act.category === "music"
                          ? `Listening: ${act.title}`
                          : `${act.service}: ${act.title}`}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-current animate-pulse" />
                    </span>
                  ))
                ) : (
                  <span className="text-xs font-mono text-[#928B87] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#928B87]" />
                    <span>Hardware daemons standing by · Ready for task execution</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Status Pill */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-center gap-1.5 pt-3 md:pt-0 border-t md:border-t-0 border-[#EDE4D9] shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-[#1A1816] bg-[#F3ECE4] px-3.5 py-1.5 rounded-full border border-[#EDE4D9]">
              <span
                className={`w-2 h-2 rounded-full ${
                  discordStatus !== "offline" ? "bg-[#566449] animate-pulse" : "bg-[#928B87]"
                }`}
              />
              <span className="font-semibold">
                {discordStatus === "offline"
                  ? "Devices Standby • Hub Online"
                  : `${isMobileActive || mobileActivities.length > 0 ? "Mobile Node" : ""} ${
                      (isMobileActive || mobileActivities.length > 0) &&
                      (isDesktopActive || desktopActivities.length > 0)
                        ? "• "
                        : ""
                    }${isDesktopActive || desktopActivities.length > 0 ? "Desktop Rig" : ""} Active`}
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#7A746D]">
              Lanyard Telemetry &amp; Social Channels
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <div className={`p-4 sm:p-6 rounded-lg border shadow-sm flex flex-col justify-between h-full transition-all ${isMobileActive || mobileActivities.length > 0 ? "bg-[#FDFCFA] border-[#EDE4D9] hover:border-[#D4C3AF]" : "bg-[#F7F2EB]/60 border-[#E8DFC8] opacity-80"}`}>
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE4D9] h-12">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${isMobileActive || mobileActivities.length > 0 ? "bg-[#C4604A]/10 text-[#C4604A]" : "bg-[#928B87]/10 text-[#928B87]"}`}>
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#1A1816]">Vivo X90 Pro 5G</h3>
                    <p className="text-xs text-[#7A746D]">Dimensity 9200 · Android 16</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 h-7 flex items-center">
                {mobileActivities.length > 0 ? (
                  <div className="flex items-center justify-between gap-2 bg-[#F3ECE4] px-2.5 py-1 rounded border border-[#EDE4D9] w-full text-xs font-mono text-[#5E5854]">
                    <span className="flex items-center gap-1.5 font-semibold text-[#1A1816] truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C4604A] animate-pulse" />
                      <span>{mobileActivities.length > 1 ? `${mobileActivities.length} Sessions Active` : `${mobileActivities[0].service} Active`}</span>
                    </span>
                    <span className="text-[10.5px] text-[#928B87] shrink-0 font-medium">
                      {mobileActivities.map((a) => a.service).join(" + ")}
                    </span>
                  </div>
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

              <div className="mt-4 flex-1 flex flex-col justify-start space-y-3">
                {mobileActivities.length > 0 ? (
                  mobileActivities.map((act) => renderActivityWidget(act))
                ) : (
                  <div className="p-4 rounded bg-[#FAF6F1] border border-[#EDE4D9] flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#7A746D]">
                          Mobile Station Specs
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#566449] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#566449] animate-pulse" />
                          <span>5G SA Connected</span>
                        </span>
                      </div>

                      <div className="space-y-1.5 text-[11.5px] font-mono text-[#5E5854]">
                        <div className="flex justify-between pb-1 border-b border-[#EDE4D9]/60">
                          <span className="text-[#928B87]">Processor</span>
                          <span className="font-semibold text-[#1A1816]">Dimensity 9200 (Octa-core)</span>
                        </div>
                        <div className="flex justify-between pb-1 border-b border-[#EDE4D9]/60">
                          <span className="text-[#928B87]">Platform</span>
                          <span className="font-semibold text-[#1A1816]">Vivo UI 5.0 · Android 16</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#928B87]">Media Sync</span>
                          <span className="font-semibold text-[#1A1816]">Audio &amp; Video Streams Ready</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#EDE4D9]/80 mt-auto">
                      <div className="w-full py-1.5 px-3 rounded bg-[#EDE4D9]/40 border border-[#E2D5C6] text-[#7A746D] text-[11px] font-mono flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Radio className="w-3 h-3 text-[#7A746D]" />
                          <span>Mobile Feed</span>
                        </span>
                        <span className="text-[#5E5854] font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#928B87]" />
                          Standby
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-[#EDE4D9] text-xs text-[#7A746D] flex justify-between font-mono">
              <span>{isMobileActive || mobileActivities.length > 0 ? "● Live" : "○ Idle"}</span>
              <span>Mobile Device</span>
            </div>
          </div>

          <div className={`p-4 sm:p-6 rounded-lg border shadow-sm flex flex-col justify-between h-full transition-all ${isDesktopActive || desktopActivities.length > 0 ? "bg-[#FDFCFA] border-[#EDE4D9] hover:border-[#D4C3AF]" : "bg-[#F7F2EB]/60 border-[#E8DFC8] opacity-80"}`}>
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE4D9] h-12">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${isDesktopActive || desktopActivities.length > 0 ? "bg-[#1A1816] text-[#FAF6F1]" : "bg-[#928B87]/10 text-[#928B87]"}`}>
                    <Laptop className="w-4 h-4 text-[#C4604A]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#1A1816]">Gaming &amp; Dev lap</h3>
                    <p className="text-xs text-[#7A746D]">i5-1240P · 12th Gen · Intel(R)</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 h-7 flex items-center">
                {desktopActivities.length > 0 ? (
                  <div className="flex items-center justify-between gap-2 bg-[#F3ECE4] px-2.5 py-1 rounded border border-[#EDE4D9] w-full text-xs font-mono text-[#5E5854]">
                    <span className="flex items-center gap-1.5 font-semibold text-[#1A1816] truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#566449] animate-pulse" />
                      <span>{desktopActivities.length > 1 ? `${desktopActivities.length} Processes Active` : `${desktopActivities[0].service} Active`}</span>
                    </span>
                    <span className="text-[10.5px] text-[#928B87] shrink-0 font-medium">
                      {desktopActivities.map((a) => a.service).join(" + ")}
                    </span>
                  </div>
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

              <div className="mt-4 flex-1 flex flex-col justify-start space-y-3">
                {desktopActivities.length > 0 ? (
                  desktopActivities.map((act) => renderActivityWidget(act))
                ) : isDesktopActive ? (
                  <div className="p-4 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1">
                    <p className="font-serif font-bold text-sm text-[#1A1816]">Desktop Online</p>
                    <p className="text-xs text-[#5E5854]">Windows 11 · Workstation Ready</p>
                  </div>
                ) : (
                  <div className="p-4 rounded bg-[#FAF6F1]/50 border border-[#EDE4D9]/60 space-y-1">
                    <p className="text-xs text-[#5E5854]">Off</p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-[#EDE4D9] flex items-center justify-between text-xs text-[#7A746D] font-mono">
              <span>{isDesktopActive || desktopActivities.length > 0 ? "● Active" : "○ Off"}</span>
              <span>Primary Rig</span>
            </div>
          </div>

          {/* Card 3: Social Channels & Content Hub */}
          <div className="p-4 sm:p-6 rounded-lg bg-[#FDFCFA] border border-[#EDE4D9] hover:border-[#D4C3AF] shadow-sm flex flex-col justify-between h-full transition-all">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE4D9] h-12">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-[#E1306C]/10 text-[#E1306C] flex items-center justify-center">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#1A1816]">Social &amp; Content Hub</h3>
                    <p className="text-xs text-[#7A746D]">@shiv__369_ · Creator Handles</p>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="mt-4 h-7 flex items-center">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#F3ECE4] border border-[#EDE4D9] w-full text-xs font-mono text-[#5E5854]">
                  <span className="w-2 h-2 rounded-full bg-[#E1306C] animate-pulse" />
                  <span className="font-semibold text-[#1A1816]">Instagram Connected</span>
                  <span className="ml-auto text-[10.5px] text-[#928B87]">@shiv__369_</span>
                </div>
              </div>

              {/* Details Box */}
              <div className="mt-4 p-4 rounded bg-[#FAF6F1] border border-[#EDE4D9] flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Instagram Card */}
                  <div className="p-3 rounded-lg bg-[#FDFCFA] border border-[#E8DFC8] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-[#E1306C]" />
                        <span className="font-serif font-bold text-sm text-[#1A1816]">Instagram</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E1306C]/10 text-[#E1306C] font-bold">
                        ● Active Profile
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#7A746D]">Handle</span>
                      <span className="font-bold text-[#1A1816]">@shiv__369_</span>
                    </div>
                    <p className="text-[11.5px] text-[#5E5854] leading-snug">
                      Dev updates, project highlights &amp; behind-the-scenes engineering logs.
                    </p>
                    <a
                      href="https://www.instagram.com/shiv__369_?stkn=MTFwbmhzZ3RhOGdkeQ=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-[#E1306C] text-white hover:bg-[#C1275B] text-[11px] font-mono font-medium transition-colors shadow-xs text-center mt-1"
                    >
                      <span>Visit @shiv__369_</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* YouTube Card (Coming Soon) */}
                  <div className="p-3 rounded-lg bg-[#F7F2EB]/70 border border-[#EDE4D9] space-y-1.5 opacity-90">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Youtube className="w-4 h-4 text-[#C4604A]" />
                        <span className="font-serif font-bold text-sm text-[#1A1816]">YouTube Channel</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C4604A]/10 text-[#C4604A] font-medium">
                        Opening Soon
                      </span>
                    </div>
                    <p className="text-[11.5px] text-[#7A746D] leading-snug">
                      Account setup in progress. Video devlogs &amp; system architecture tutorials.
                    </p>
                  </div>
                </div>

                {/* Footer Profiles */}
                <div className="pt-3 border-t border-[#EDE4D9]/80 mt-auto flex items-center justify-between text-[11px] font-mono text-[#7A746D]">
                  <span>Connected Channels</span>
                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://www.instagram.com/shiv__369_?stkn=MTFwbmhzZ3RhOGdkeQ=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#E1306C] transition-colors"
                      title="Instagram @omthakur.op"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://github.com/shiv369tes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#1A1816] transition-colors"
                      title="GitHub @shiv369tes"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/shivam-kedare-369t/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#0A66C2] transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://x.com/ShivK54307"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#1A1816] transition-colors"
                      title="X / Twitter"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-[#EDE4D9] text-xs text-[#7A746D] font-mono flex justify-between">
              <span>● Connected</span>
              <span>Instagram @shiv__369_</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
