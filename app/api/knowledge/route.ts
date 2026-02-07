import { NextRequest, NextResponse } from "next/server";

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function GET() {
  try {
    if (!HEYGEN_API_KEY) {
      throw new Error("API key is missing from .env");
    }

    const res = await fetch(
      `${BASE_API_URL}/v1/streaming/knowledge_base/list`,
      {
        method: "GET",
        headers: {
          "x-api-key": HEYGEN_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Error listing knowledge bases:", error);

    return NextResponse.json(
      { error: "Failed to list knowledge bases" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!HEYGEN_API_KEY) {
      throw new Error("API key is missing from .env");
    }

    const body = await request.json();

    const res = await fetch(
      `${BASE_API_URL}/v1/streaming/knowledge_base/create`,
      {
        method: "POST",
        headers: {
          "x-api-key": HEYGEN_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: body.name,
          content: body.content,
        }),
      },
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Error creating knowledge base:", error);

    return NextResponse.json(
      { error: "Failed to create knowledge base" },
      { status: 500 },
    );
  }
}
