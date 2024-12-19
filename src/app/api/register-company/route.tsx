import { getBaseURL } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    
    try {
        const body = await request.json();
        const res = await fetch(`${getBaseURL()}/company-user`, {
            method: "POST",
            body: JSON.stringify({
                Username: body.company,
                Password: body.password,
                email: body.email,
                Sunac: body.ruc,
                IndustrySector: body.type,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    
        if(!res.ok) {
            const { message } = await res.json()
            return NextResponse.json({ success: false, message: message });
        }
    
        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: { "content-type": "application/json" } }
        );

        return response;
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message });
    }
}