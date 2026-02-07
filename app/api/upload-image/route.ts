import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/app/lib/lemonslice";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 },
      );
    }

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    const data = await uploadImage(uploadFormData);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error uploading image:", error);

    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
