"use client";

import { Compass, Layout } from "lucide-react";
import SidebarItem from "./SidebarItem";

const guestRoutes = [
  {
    icon: Layout,
    href: "/",
    label: "Dashboard",
  },
  {
    icon: Compass,
    href: "/search",
    label: "Browse",
  },
];

const SidebarRoutes = () => {
  const routes = guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => {
        return (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            href={route.href}
            label={route.label}
          />
        );
      })}
    </div>
  );
};

export default SidebarRoutes;
