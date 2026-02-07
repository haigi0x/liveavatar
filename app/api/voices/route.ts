import { NextResponse } from "next/server";
import { listVoices } from "@/app/lib/lemonslice";

export async function GET() {
  try {
    const data = await listVoices();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error listing voices:", error);
    return NextResponse.json(
      { error: "Failed to list voices" },
      { status: 500 },
    );
  }
}
