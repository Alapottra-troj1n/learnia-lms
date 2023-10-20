'use client'

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "react-hot-toast";

interface FileUploadProps {
    onChange: (url?:string) => void;
    endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({onChange,endpoint}: FileUploadProps) => {
    return (<div>
        <UploadDropzone 
        endpoint={endpoint}
        onClientUploadComplete={(req)=> {
            onChange(req?.[0].url)
        }} 
        onUploadError={(err)=> {
            toast.error(err?.message)
        }}
        />
    </div>)
}