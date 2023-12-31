import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {params}: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const values = await req.json();
    
    if(!userId){
        return new NextResponse('Unauthorized Access',{status: 401})
    }

    const course = await db.course.update({
        where: {
            id: params.courseId,
            userId
        },
        data: {
            ...values
        }
    });

    return NextResponse.json(course)


  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse('Internal Server Error',{status: 500})
  }
}
