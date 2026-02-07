import { NextRequest, NextResponse } from "next/server";
import { createSession, endSession } from "@/app/lib/lemonslice";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await createSession(body);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("id");
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 },
      );
    }
    const data = await endSession(sessionId);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error ending session:", error);
    return NextResponse.json(
      { error: "Failed to end session" },
      { status: 500 },
    );
  }
}
