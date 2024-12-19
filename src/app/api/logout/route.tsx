import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        cookies().delete("token");
        console.log("Logged out");

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}