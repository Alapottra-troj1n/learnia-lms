"use client";

import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");


  return (
    <div className="flex items-center gap-x-2 ml-auto">

        {isTeacherPage ? (
            <Link className="flex items-center gap-2 text-sm mr-2" href={'/'}>
                <LogOut className="h-4 w-4" />
                <span>Exit</span>
            </Link>
        ): (
            <Link href={'/teacher/courses'} >
            <Button size={'sm'} variant={'ghost'} className="mr-2" >
                Teacher Mode
            </Button>
            </Link>
        )}
        
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarRoutes;
