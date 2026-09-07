# Discord Integration Guide: Method A (Gateway WebSocket) & Webhooks

A comprehensive guide on implementing **Discord Rich Presence via Direct Gateway WebSocket (Method A)** across any device and programming language (Mobile, Web, Servers, Microcontrollers), as well as integrating **Discord Webhooks**.

---

## Table of Contents
1. [Overview](#1-overview)
2. [Method A: Gateway WebSocket Protocol](#2-method-a-gateway-websocket-protocol)
   - [Why Method A?](#why-method-a)
   - [Full Connection Lifecycle](#full-connection-lifecycle)
   - [Gateway Opcodes Reference](#gateway-opcodes-reference)
3. [Step-by-Step Gateway Implementation](#3-step-by-step-gateway-implementation)
   - [Step 1: Connecting to Gateway](#step-1-connecting-to-gateway)
   - [Step 2: Handling `HELLO` & Heartbeating](#step-2-handling-hello--heartbeating)
   - [Step 3: Authenticating (`IDENTIFY`)](#step-3-authenticating-identify)
   - [Step 4: Updating Rich Presence (`PRESENCE_UPDATE`)](#step-4-updating-rich-presence-presence_update)
   - [Step 5: Dynamic Cover Art & External Assets](#step-5-dynamic-cover-art--external-assets)
4. [Language Code Examples](#4-language-code-examples)
   - [JavaScript / TypeScript (Node.js & Web)](#javascript--typescript-nodejs--web)
   - [Python (Asyncio / Websockets)](#python-asyncio--websockets)
   - [Kotlin / Android (OkHttp / Ktor)](#kotlin--android-okhttp--ktor)
5. [Discord Webhooks Guide](#5-discord-webhooks-guide)
   - [Sending Simple Messages](#sending-simple-messages)
   - [Sending Rich Embeds](#sending-rich-embeds)
6. [Best Practices & Security](#6-best-practices--security)

---

## 1. Overview

Discord provides multiple mechanisms for integrations:
- **Local IPC Socket (Method B):** Requires the Discord Desktop app to be running locally on Windows, macOS, or Linux. Communicates over named pipes (`\\.\pipe\discord-ipc-0`) or Unix domain sockets.
- **Direct Gateway WebSocket (Method A):** Connects directly to Discord's WebSocket server (`wss://gateway.discord.gg`). Works on **any device and operating system** (Android, iOS, Web Browsers, Cloud Servers, Raspberry Pi, IoT) without requiring the Discord desktop app locally.
- **Webhooks:** HTTP POST endpoints to push notifications, embeds, and automated alerts directly to a Discord channel.

---

## 2. Method A: Gateway WebSocket Protocol

### Why Method A?
Traditional Discord Rich Presence libraries rely on local desktop IPC sockets. Mobile apps (such as Android music players like Metrolist) and cloud services cannot use local IPC because there is no Discord desktop client running on the local machine. Method A establishes a direct WebSocket connection to Discord's official Gateway, enabling universal presence updates.

### Full Connection Lifecycle

```
    Client                                  Discord Gateway
      │                                            │
      │────────────── Connect WebSocket ──────────>│  wss://gateway.discord.gg/?v=10&encoding=json
      │                                            │
      │<─────────── Opcode 10 (HELLO) ─────────────│  { "d": { "heartbeat_interval": 41250 } }
      │                                            │
      │────────── Opcode 2 (IDENTIFY) ────────────>│  { "op": 2, "d": { "token": "...", "properties": {...} } }
      │                                            │
      │<─────────── Opcode 0 (READY) ──────────────│  Connection established & session created!
      │                                            │
      │───── Opcode 1 (HEARTBEAT) [Every ~41s] ───>│  { "op": 1, "d": last_sequence_number }
      │<───────── Opcode 11 (HEARTBEAT_ACK) ───────│  Heartbeat acknowledged
      │                                            │
      │────── Opcode 3 (PRESENCE_UPDATE) ─────────>│  Updates user presence status & activity
```

### Gateway Opcodes Reference

| Opcode | Name | Direction | Description |
| :--- | :--- | :--- | :--- |
| `0` | `Dispatch` | Receive | Event payload (e.g., `READY`, `RESUMED`) |
| `1` | `Heartbeat` | Send/Receive | Ping keepalive frame |
| `2` | `Identify` | Send | Authenticate session with user/bot token |
| `3` | `Presence Update` | Send | Update presence (Activity status, song, etc.) |
| `6` | `Resume` | Send | Resume a disconnected session |
| `7` | `Reconnect` | Receive | Server requests client to reconnect |
| `9` | `Invalid Session` | Receive | Session invalidated, must re-identify |
| `10` | `Hello` | Receive | Initial frame sent upon connection, contains heartbeat interval |
| `11` | `Heartbeat ACK` | Receive | Acknowledgment of heartbeat |

---

## 3. Step-by-Step Gateway Implementation

### Step 1: Connecting to Gateway
Connect via Secure WebSocket to:
```text
wss://gateway.discord.gg/?v=10&encoding=json
```

### Step 2: Handling `HELLO` & Heartbeating
Upon connecting, Discord sends Opcode `10` (`HELLO`):
```json
{
  "op": 10,
  "d": {
    "heartbeat_interval": 41250
  }
}
```
Client must start a background timer sending Opcode `1` every `heartbeat_interval` milliseconds:
```json
{
  "op": 1,
  "d": 0
}
```

### Step 3: Authenticating (`IDENTIFY`)
After receiving `HELLO`, send Opcode `2` (`IDENTIFY`):
```json
{
  "op": 2,
  "d": {
    "token": "YOUR_USER_DISCORD_TOKEN",
    "intents": 0,
    "properties": {
      "os": "android",
      "browser": "Discord Android",
      "device": "Metrolist"
    }
  }
}
```

### Step 4: Updating Rich Presence (`PRESENCE_UPDATE`)
Send Opcode `3` whenever status or playback changes:
```json
{
  "op": 3,
  "d": {
    "since": 0,
    "activities": [
      {
        "name": "My App / Music Player",
        "type": 2,
        "details": "Song Title",
        "state": "Artist / Album Name",
        "timestamps": {
          "start": 1700000000000,
          "end": 1700000200000
        },
        "assets": {
          "large_image": "mp:external/...",
          "large_text": "Album Name"
        },
        "buttons": ["Listen along"],
        "metadata": {
          "button_urls": ["https://example.com"]
        }
      }
    ],
    "status": "online",
    "afk": false
  }
}
```

#### Activity Types:
- `0`: Playing
- `1`: Streaming
- `2`: Listening
- `3`: Watching
- `4`: Custom
- `5`: Competing

### Step 5: Dynamic Cover Art & External Assets
Discord Gateway accepts `mp:external/...` hashes for dynamic external image URLs (e.g. YouTube Music / Spotify covers).
To generate a proxy path:

Make an HTTP POST request:
```http
POST https://discord.com/api/v9/applications/{APPLICATION_ID}/external-assets
Authorization: YOUR_DISCORD_TOKEN
Content-Type: application/json

{
  "urls": ["https://i.ytimg.com/vi/example/maxresdefault.jpg"]
}
```
Response:
```json
[
  {
    "url": "https://i.ytimg.com/vi/example/maxresdefault.jpg",
    "external_asset_path": "mp:external/hash_string"
  }
]
```
Use `"large_image": "mp:external/hash_string"` in your `assets` payload.

---

## 4. Language Code Examples

### JavaScript / TypeScript (Node.js & Web)

```javascript
const WebSocket = require('ws');

class DiscordGatewayRPC {
  constructor(token, appId) {
    this.token = token;
    this.appId = appId;
    this.ws = null;
    this.heartbeatTimer = null;
  }

  connect() {
    this.ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

    this.ws.on('open', () => console.log('Connected to Discord Gateway'));

    this.ws.on('message', (data) => {
      const payload = JSON.parse(data);
      const { op, d, t } = payload;

      if (op === 10) {
        // HELLO opcode
        this.startHeartbeat(d.heartbeat_interval);
        this.identify();
      } else if (t === 'READY') {
        console.log('Discord Gateway Ready!');
      }
    });

    this.ws.on('close', (code, reason) => {
      console.log(`Gateway closed: ${code} - ${reason}`);
      clearInterval(this.heartbeatTimer);
    });
  }

  startHeartbeat(interval) {
    this.heartbeatTimer = setInterval(() => {
      this.ws.send(JSON.stringify({ op: 1, d: null }));
    }, interval);
  }

  identify() {
    this.ws.send(JSON.stringify({
      op: 2,
      d: {
        token: this.token,
        intents: 0,
        properties: { os: 'linux', browser: 'custom-rpc', device: 'app' }
      }
    }));
  }

  updatePresence(details, state, largeImageUrl = null) {
    const activity = {
      name: 'Custom Player',
      type: 2, // Listening
      details: details,
      state: state,
      timestamps: { start: Date.now() }
    };

    if (largeImageUrl) {
      activity.assets = { large_image: largeImageUrl };
    }

    this.ws.send(JSON.stringify({
      op: 3,
      d: {
        since: 0,
        activities: [activity],
        status: 'online',
        afk: false
      }
    }));
  }
}

module.exports = DiscordGatewayRPC;
```

---

### Python (Asyncio / Websockets)

```python
import asyncio
import json
import time
import websockets

class DiscordGatewayRPC:
    def __init__(self, token: str):
        self.token = token
        self.ws = None
        self.heartbeat_task = None

    async def heartbeat(self, interval_ms: int):
        while True:
            await asyncio.sleep(interval_ms / 1000)
            await self.ws.send(json.dumps({"op": 1, "d": None}))

    async def connect(self):
        url = "wss://gateway.discord.gg/?v=10&encoding=json"
        async with websockets.connect(url) as ws:
            self.ws = ws
            hello = json.loads(await ws.recv())
            interval = hello["d"]["heartbeat_interval"]

            self.heartbeat_task = asyncio.create_task(self.heartbeat(interval))

            # Identify
            await ws.send(json.dumps({
                "op": 2,
                "d": {
                    "token": self.token,
                    "intents": 0,
                    "properties": {"os": "windows", "browser": "python-rpc", "device": "python"}
                }
            }))

            # Wait for READY frame
            ready = await ws.recv()
            print("Connected to Discord Gateway!")

            # Set Presence
            await self.update_presence("Coding in Python", "Developing Method A RPC")

            # Keep connection open
            while True:
                await ws.recv()

    async def update_presence(self, details: str, state: str):
        payload = {
            "op": 3,
            "d": {
                "since": 0,
                "activities": [{
                    "name": "Python Application",
                    "type": 0, # Playing
                    "details": details,
                    "state": state,
                    "timestamps": {"start": int(time.time() * 1000)}
                }],
                "status": "online",
                "afk": False
            }
        }
        await self.ws.send(json.dumps(payload))

# Run in event loop
# asyncio.run(DiscordGatewayRPC("YOUR_TOKEN").connect())
```

---

### Kotlin / Android (OkHttp / Ktor)

Refer to Metrolist implementation:
- WebSocket connection: [`DiscordGateway.kt`](file:///c:/Users/Admin/Desktop/om-projects/shivamkedare/Metrolist/app/src/main/kotlin/com/metrolist/music/discord/DiscordGateway.kt)
- Activity builder: [`DiscordPresence.kt`](file:///c:/Users/Admin/Desktop/om-projects/shivamkedare/Metrolist/app/src/main/kotlin/com/metrolist/music/discord/DiscordPresence.kt)
- External asset resolution: [`DiscordExternalAssets.kt`](file:///c:/Users/Admin/Desktop/om-projects/shivamkedare/Metrolist/app/src/main/kotlin/com/metrolist/music/discord/DiscordExternalAssets.kt)

---

## 5. Discord Webhooks Guide

Discord Webhooks provide a lightweight HTTP interface to post messages and rich embeds to Discord channels without needing a bot account or Gateway connection.

### Sending Simple Messages

**Endpoint:** `POST https://discord.com/api/webhooks/{WEBHOOK_ID}/{WEBHOOK_TOKEN}`

#### cURL:
```bash
curl -H "Content-Type: application/json" \
     -X POST \
     -d '{"content": "Hello World from Webhook!"}' \
     https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN
```

#### JavaScript:
```javascript
async function sendWebhookMessage(webhookUrl, message) {
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message })
  });
}
```

---

### Sending Rich Embeds

#### JavaScript Embed Example:
```javascript
async function sendWebhookEmbed(webhookUrl) {
  const payload = {
    username: "System Logger",
    avatar_url: "https://example.com/avatar.png",
    embeds: [
      {
        title: "🚀 Deployment Successful",
        description: "App successfully deployed to production.",
        color: 3066993, // Decimal Green (0x2ECC71)
        fields: [
          { name: "Environment", value: "Production", inline: true },
          { name: "Version", value: "v1.2.4", inline: true }
        ],
        footer: {
          text: "Automated Deployment Script"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}
```

---

## 6. Best Practices & Security

1. **Token Security:** Never hardcode user tokens or webhook secrets in public repositories. Store them in secure encrypted storage (e.g., Android Keystore, EncryptedSharedPreferences, or `.env` files).
2. **Rate Limits (`429`):** Handle HTTP `429 Too Many Requests`. Respect the `Retry-After` header returned by Discord's API.
3. **Heartbeat Acknowledgments:** Monitor Opcode `11` (`HEARTBEAT_ACK`). If Discord fails to ACK a heartbeat before the next heartbeat cycle, close the WebSocket and reconnect.
4. **Exponential Backoff:** Implement exponential backoff when reconnecting after connection drops (e.g. 1s, 2s, 4s, 8s up to 64s with jitter).
