import IconBadge from "@/components/IconBadge";
import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  if (!course) {
    redirect("/");
  }

  const requiredFields = [
    course.categoryId,
    course.imageUrl,
    course.title,
    course.description,
    course.price,
  ];

  const completedFields = requiredFields.filter(Boolean).length;

  const completePercentage = `(${completedFields}/ ${requiredFields.length})`;

  return (
    <div className="p-6">
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-3xl font-bold">Course Setup</h2>

        <span className="text-sm text-slate-700 mt-2">
          Complete all fields {completePercentage}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize Your Course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id}  />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
