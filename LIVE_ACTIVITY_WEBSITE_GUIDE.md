# Cross-Device Live Activity Tracking Guide for Websites

Learn how to broadcast your live status (**what you're doing on Android + 2 PCs**) directly onto your personal website in real-time.

---

## Executive Summary: How Can We Do It?

### Can we read Discord RPC?
**Yes! Discord is the absolute best centralized hub for this.** 

Since you log into the same Discord account across your **Android Phone** and **2 PCs**:
- **PC 1** updates Discord (e.g., VS Code extension, Steam games, Spotify).
- **PC 2** updates Discord (e.g., Coding, Browsing, Games).
- **Android Phone** updates Discord (e.g., Metrolist music player, Discord mobile status).

Discord aggregates all 3 devices into **one central user status**. By reading your Discord status via an API on your website, you automatically get real-time activity from **all 3 devices** without building custom backend daemons for each machine!

---

## Architecture Comparison

| Method | Setup Effort | Real-time WebSocket | Supports Music & VS Code | Server Maintenance |
| :--- | :--- | :--- | :--- | :--- |
| **Method 1: Lanyard API + Discord (Recommended)** | ⚡ 5 minutes | ✅ Built-in | ✅ Complete | Zero (Hosted / Free) |
| **Method 2: Custom Bot / Self-Hosted Gateway** | 🛠️ Moderate | ✅ Custom WS | ✅ Complete | Low (Run node bot) |
| **Method 3: Direct Custom API Route (`/api/presence`)** | ⚙️ High | 🔄 Polling/WS | ⚠️ Requires client scripts | Low (Next.js route) |

---

## Method 1: The Lanyard API Approach (Recommended)

[Lanyard](https://github.com/phineas/lanyard) is an open-source service built specifically to expose your Discord status as a REST and WebSocket API for personal portfolio websites.

### How Lanyard Works:
1. Join the official Lanyard Discord server (it runs a bot that monitors your presence).
2. Your website fetches your presence from `https://api.lanyard.rest/v1/users/{YOUR_DISCORD_USER_ID}` or connects to Lanyard's WebSocket.
3. You get a live JSON object containing:
   - **Online Status:** `online`, `idle`, `dnd`, `offline`
   - **Active Devices:** `desktop`, `mobile`, `web`
   - **Spotify Status:** Song name, artist, album art, duration, track progress
   - **Custom Activities:** VS Code file name/project, games being played, Metrolist music, custom Rich Presence
   - **Custom Status:** Discord status emoji and text

---

### Step 1: Set Up Lanyard
1. Join the [Lanyard Discord Server](https://discord.gg/lanyard).
2. Copy your **Discord User ID** (Enable Developer Mode in Discord Settings -> Right-click your profile -> Copy User ID).

---

### Step 2: Fetch Live Status in Next.js / React (`shivamkedare`)

Create a reusable component in your project: `components/LiveStatus.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";

interface LanyardData {
  discord_status: "online" | "idle" | "dnd" | "offline";
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  spotify: {
    song: string;
    artist: string;
    album_art_url: string;
  } | null;
  activities: Array<{
    name: string;
    details?: string;
    state?: string;
    assets?: {
      large_image?: string;
    };
  }>;
}

export default function LiveStatus({ discordId }: { discordId: string }) {
  const [status, setStatus] = useState<LanyardData | null>(null);

  useEffect(() => {
    // 1. Fetch initial status via REST
    fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStatus(data.data);
      });

    // 2. Connect to WebSocket for instant real-time updates
    const ws = new WebSocket("wss://api.lanyard.rest/socket");

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: 2, // Subscribe Opcode
          d: { subscribe_to_id: discordId },
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") {
        setStatus(data.d);
      }
    };

    return () => ws.close();
  }, [discordId]);

  if (!status) return <div>Loading live status...</div>;

  const isOnline = status.discord_status !== "offline";
  const vscodeActivity = status.activities.find((a) => a.name === "Visual Studio Code");
  const currentGame = status.activities.find((a) => a.name !== "Spotify" && a.name !== "Visual Studio Code");

  return (
    <div className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md max-w-md text-white">
      {/* User Status Badge */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative">
          <div
            className={`w-4 h-4 rounded-full ${
              status.discord_status === "online"
                ? "bg-green-500"
                : status.discord_status === "idle"
                ? "bg-amber-500"
                : status.discord_status === "dnd"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          />
        </div>
        <span className="font-semibold capitalize">
          Currently {status.discord_status}
        </span>
        <span className="text-xs text-gray-400">
          ({status.active_on_discord_desktop ? "Desktop PC" : ""} {status.active_on_discord_mobile ? "Android" : ""})
        </span>
      </div>

      {/* Spotify Playing Status */}
      {status.spotify && (
        <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg mb-2 border border-white/5">
          <img
            src={status.spotify.album_art_url}
            alt="Album Art"
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <div className="text-xs text-green-400 font-medium">Listening to Spotify</div>
            <div className="text-sm font-semibold truncate">{status.spotify.song}</div>
            <div className="text-xs text-gray-400 truncate">{status.spotify.artist}</div>
          </div>
        </div>
      )}

      {/* VS Code Coding Status */}
      {vscodeActivity && (
        <div className="p-2 bg-white/5 rounded-lg mb-2 border border-white/5">
          <div className="text-xs text-blue-400 font-medium">Editing in VS Code</div>
          <div className="text-sm font-semibold">{vscodeActivity.details}</div>
          <div className="text-xs text-gray-400">{vscodeActivity.state}</div>
        </div>
      )}

      {/* Gaming Status */}
      {currentGame && (
        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
          <div className="text-xs text-purple-400 font-medium">Playing Game</div>
          <div className="text-sm font-semibold">{currentGame.name}</div>
          {currentGame.details && <div className="text-xs text-gray-400">{currentGame.details}</div>}
        </div>
      )}
    </div>
  );
}
```

---

## Method 2: Custom API Endpoint (Direct Device Telemetry)

If you do **not** want to rely on Discord, you can create a custom API route inside your Next.js application that receives heartbeats from your 2 PCs and Android phone.

### 1. Create API Route in `app/api/presence/route.ts`

```typescript
import { NextResponse } from "next/server";

// In-memory store (or use Redis / Supabase for persistence)
let currentPresence = {
  lastUpdated: Date.now(),
  device: "None",
  activity: "Idle",
  details: "",
};

// GET: Website fetches current presence
export async function GET() {
  return NextResponse.json(currentPresence);
}

// POST: PCs / Android send updates here
export async function POST(req: Request) {
  const body = await req.json();
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.PRESENCE_SECRET_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  currentPresence = {
    lastUpdated: Date.now(),
    device: body.device || "Unknown Device",
    activity: body.activity || "Active",
    details: body.details || "",
  };

  return NextResponse.json({ success: true, presence: currentPresence });
}
```

### 2. Device Reporting Scripts

#### PC 1 & PC 2 (Python Background Daemon):
```python
import time
import requests

API_URL = "https://your-website.com/api/presence"
SECRET_KEY = "YOUR_PRESENCE_SECRET_KEY"

def send_heartbeat(device_name, activity, details):
    headers = {"Authorization": f"Bearer {SECRET_KEY}"}
    payload = {
        "device": device_name,
        "activity": activity,
        "details": details
    }
    requests.post(API_URL, json=payload, headers=headers)

# Periodically send status
while True:
    send_heartbeat("PC-1 Windows", "Coding in VS Code", "Project: shivamkedare")
    time.sleep(30)
```

#### Android Phone:
- Use **Tasker** or **HTTP Shortcuts** app on Android to make an HTTP POST to `https://your-website.com/api/presence` whenever music plays or battery status changes.

---

## Summary & Recommendation

1. **Best & Easiest Solution:** **Discord + Lanyard API**. It requires **zero custom code on your 3 devices**. Any app updating Discord (VS Code, Spotify, Steam, Metrolist) automatically syncs to your website in real-time via WebSocket.
2. **Fallback Custom Solution:** Build a Next.js `/api/presence` route with lightweight Python/HTTP daemons on your devices if you prefer not to use Discord.
