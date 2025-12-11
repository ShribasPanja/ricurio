import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        // Get the auth token from the Authorization header
        const authHeader = request.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Missing or invalid Authorization header" },
                { status: 401 }
            );
        }

        const token = authHeader.replace("Bearer ", "");

        // Fetch user info from Google OAuth2 API
        const response = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch user info from Google" },
                { status: 401 }
            );
        }

        const googleUser = await response.json();
        const { email, name } = googleUser;

        if (!email) {
            return NextResponse.json(
                { error: "Email not found in Google user info" },
                { status: 400 }
            );
        }

        // Upsert user in database
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                name: name || undefined,
                updatedAt: new Date(),
            },
            create: {
                email,
                name: name || null,
            },
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                subscriptionStatus: user.subscriptionStatus,
                planType: user.planType,
            },
        });
    } catch (error) {
        console.error("Error in Google auth endpoint:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
