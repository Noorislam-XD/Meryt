import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("x-meryt-webhook-secret");
  const expectedSecret = process.env.WEBHOOK_SECRET ?? "dev_secret";

  if (authHeader !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = (body as Record<string, unknown>)?.event as string;
  const data = (body as Record<string, unknown>)?.data;

  const supportedEvents = [
    "score.updated", "profile.verified", "profile.created",
    "rank.changed", "verification.submitted", "verification.approved", "verification.rejected",
  ];

  if (!event || !supportedEvents.includes(event)) {
    return NextResponse.json({ error: "Unsupported event", supportedEvents }, { status: 400 });
  }

  console.log(`[webhook] event=${event}`, JSON.stringify(data));

  return NextResponse.json({
    received: true,
    event,
    timestamp: new Date().toISOString(),
    message: `Event '${event}' processed successfully`,
  });
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/webhook",
    method: "POST",
    authentication: "x-meryt-webhook-secret header",
    events: [
      "score.updated — fired when a user's NI Score changes",
      "profile.verified — fired when a profile completes verification",
      "profile.created — fired when a new profile is created",
      "rank.changed — fired when a user's global rank changes",
      "verification.submitted — fired when evidence is submitted",
      "verification.approved — fired when verification is approved",
      "verification.rejected — fired when verification is rejected",
    ],
    payload: {
      event: "score.updated",
      data: {
        userId: "string",
        handle: "string",
        previousScore: "number",
        newScore: "number",
        delta: "number",
        timestamp: "ISO 8601",
      },
    },
  });
}
