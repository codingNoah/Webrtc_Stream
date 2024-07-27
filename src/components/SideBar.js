"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { House } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLink from "./NavLink";
import { links } from "@/constants/links";

function SideBar() {
  return (
    <nav className="w-[264px] bg-[#1c1f2e] hidden md:block">
      <h1 className="py-3.5 px-3 ">Logo </h1>
      <div className="px-3 py-5 flex flex-col gap-5">
        {links.map((link, index) => (
          <NavLink
            key={index}
            path={link.path}
            name={link.name}
            icon={link.icon}
          />
        ))}
      </div>
    </nav>
  );
}

export default SideBar;
