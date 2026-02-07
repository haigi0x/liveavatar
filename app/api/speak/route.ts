import { NextRequest, NextResponse } from "next/server";
import { speak } from "@/app/lib/lemonslice";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, text } = body;

    if (!session_id || !text) {
      return NextResponse.json(
        { error: "session_id and text are required" },
        { status: 400 },
      );
    }

    const data = await speak(session_id, text);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error sending speak request:", error);
    return NextResponse.json(
      { error: "Failed to send speak request" },
      { status: 500 },
    );
  }
}
