import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { success: false, message: "Missing code parameter." },
      { status: 400 }
    );
  }

  try {
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      null,
      {
        params: {
          client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    const tokenData = tokenRes.data;

    if (!tokenData.access_token) {
      return NextResponse.json(
        { success: false, message: "Failed to retrieve access token." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, token: tokenData.access_token });
  } catch (error: any) {
    console.error("Error fetching access token:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
