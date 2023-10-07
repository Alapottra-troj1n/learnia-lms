import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const course = await db.course.create({
        data: {
            userId,
            title,
        }
    });

    return NextResponse.json(course);


  } catch (err) {
    console.log(`[course]`,err)
    return new NextResponse("Internal Error", { status: 500 });
  }
}
