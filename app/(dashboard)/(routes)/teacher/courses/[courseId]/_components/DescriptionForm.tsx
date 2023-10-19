"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "description is required",
  }),
});

const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || '',
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    try {
        await axios.patch(`/api/courses/${courseId}`,values);
        toast.success('Course Updated Successfully');
        router.refresh();
        toggleEdit();

        
    } catch (error) {
        toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex justify-between items-center">
        <h2>Course Description</h2>
        <div>
          <Button variant={"ghost"} onClick={toggleEdit}>
            {isEditing && <>Cancel</>}
            {!isEditing && <Pencil />}
          </Button>
        </div>
      </div>
      <div>
        {!isEditing && (
          <>
            <p className={cn('text-sm mt-2', !initialData.description && 'italic text-sm text-gray-400')}>{initialData.description || 'No Description'}</p>
          </>
        )}

        {isEditing && (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      
                      <FormControl>
                        <Input placeholder="e.g This course is...." {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={!isValid || isSubmitting} type="submit">Save</Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default DescriptionForm;
