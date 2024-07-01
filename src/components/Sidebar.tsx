"use client";

import React from "react";
import { SidebarLinks } from "../../data/sidebar";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 left-0 flex h-screen w-fit flex-col justify-between p-6 pt-28 text-white bg-dark-1 max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {SidebarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-xl justify-start",
                {
                  "bg-blue-1": isActive,
                }
              )}
            >
              <Image
                src={link.imageUrl}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
