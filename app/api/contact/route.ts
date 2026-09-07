import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 })
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `New contact form submission`,
        embeds: [
          {
            color: 0x3498db,
            fields: [
              { name: "Name", value: body.name, inline: true },
              { name: "Email", value: body.email, inline: true },
              { name: "Message", value: body.message, inline: false },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    })

    if (!res.ok) {
      throw new Error("Discord failed")
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
