import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const { email, name } = body;

//         // Validate required fields
//         if (!email) {
//             return NextResponse.json(
//                 { error: "Email is required" },
//                 { status: 400 }
//             );
//         }

//         // Validate email format
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return NextResponse.json(
//                 { error: "Invalid email format" },
//                 { status: 400 }
//             );
//         }

//         // Check if user already exists
//         const existingUser = await prisma.user.findUnique({
//             where: { email },
//         });

//         if (existingUser) {
//             return NextResponse.json(
//                 { error: "User with this email already exists" },
//                 { status: 409 }
//             );
//         }

//         // Create new user
//         const user = await prisma.user.create({
//             data: {
//                 email,
//                 name: name || null,
//             },
//             select: {
//                 id: true,
//                 email: true,
//                 name: true,
//                 subscriptionStatus: true,
//                 planType: true,
//                 createdAt: true,
//             },
//         });

//         return NextResponse.json(
//             {
//                 success: true,
//                 message: "User created successfully",
//                 user,
//             },
//             { status: 201 }
//         );
//     } catch (error) {
//         console.error("Error creating user:", error);
//         return NextResponse.json(
//             { error: "Internal server error" },
//             { status: 500 }
//         );
//     }
// }

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (email) {
            // Get specific user by email
            const user = await prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    subscriptionStatus: true,
                    planType: true,
                    subscriptionExpiry: true,
                    createdAt: true,
                },
            });

            if (!user) {
                return NextResponse.json(
                    { error: "User not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json({ user });
        }

    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
