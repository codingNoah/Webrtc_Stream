"use client";

import React from "react";
import NavLink from "./NavLink";
import { links } from "@/constants/links";

function SideBar() {
  return (
    <nav className="w-[264px] bg-[#1c1f2e] hidden md:block">
      <h1 className="py-3.5 px-7 text-2xl">Zoom </h1>
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
