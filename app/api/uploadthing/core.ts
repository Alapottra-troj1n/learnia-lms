import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorize");
  }
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(file.url);
    }),

  courseAttachments: f(["text", "image", "audio", "video", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(file.url);
    }),

  chapterVideo: f({ video: { maxFileSize: "128GB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
