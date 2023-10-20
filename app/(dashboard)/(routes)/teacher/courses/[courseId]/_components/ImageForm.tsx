"use client";

import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Course } from "@prisma/client";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "react-hot-toast";
import * as z from "zod";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "imageUrl is required",
  }),
});

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Updated Successfully");
      router.refresh();
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex justify-between items-center">
        <h2>Course Description</h2>
        <div>
          <Button variant={"ghost"} onClick={toggleEdit}>
            {isEditing && <>Cancel</>}
            {!isEditing && initialData?.imageUrl && (
              <>
                Edit Image
                <Pencil />
              </>
            )}
            {!isEditing && !initialData?.imageUrl && (
              <>
                <span className="mx-2">Add Image</span>
                 <PlusCircleIcon />
              </>
            )}
          </Button>
        </div>
      </div>
      <div>
        {!isEditing &&
          (!initialData.imageUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative aspect-video mt-2">
              <Image
                alt="Upload"
                fill
                className="object-cover rounded-md"
                src={initialData.imageUrl}
              />
            </div>
          ))}

        {isEditing && (
          <>
            <div>
                <FileUpload 
                onChange={(url)=>{
                    if(url){
                        onSubmit({imageUrl: url})
                    }
                }}
                endpoint="courseImage" 
                
                />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageForm;
