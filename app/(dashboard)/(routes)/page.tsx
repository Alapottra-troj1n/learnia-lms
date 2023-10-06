import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
   <div className="flex justify-end p-6" >
    <UserButton afterSignOutUrl="/" ></UserButton>
   </div>
  )
}
