"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  label: string;
  href: string;
  icon: LucideIcon;
}

const SidebarItem = ({ label, href, icon: Icon }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-purple-700 bg-purple-200/20 hover:bg-purple-200/20 hover:text-purple-700 border-r-purple-700 border-r-4"
      )}
    >
        <div className="flex items-center gap-x-2 py-4">
            <Icon size={22} className={cn('text-slate-700', isActive && 'text-purple-700')} />
        </div>
      {label}
    </button>
  );
};

export default SidebarItem;
