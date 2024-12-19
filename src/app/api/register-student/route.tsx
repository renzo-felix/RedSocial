import { getBaseURL } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    
    try {
        const body = await request.json();
        const res = await fetch(`${getBaseURL()}/student-user`, {
            method: "POST",
            body: JSON.stringify({
                Name: body.name,
                LastName: body.last_name,
                Password: body.password,
                email: body.email,
                UserProfile: {
                    Institute: body.university,
                    Description: 'Soy nuev@ en la plataforma!',
                    GitHub: body.githubUsername,
                    Career: body.career,
                    Cycle: body.ciclo,
                }
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