"use client";
import { BookMarked, House, Plus, Video } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavLink({ path, name, icon }) {
  const pathname = usePathname();

  let renderIcon;

  switch (icon) {
    case "House":
      renderIcon = <House />;
      break;
    case "BookMarked":
      renderIcon = <BookMarked />;
      break;
    case "Video":
      renderIcon = <Video />;
      break;
    case "Plus":
      renderIcon = <Plus />;
      break;
  }

  return (
    <Link
      className={`flex gap-5 items-center px-4 py-3 text-xl rounded hover:bg-[#4196fd] ${
        pathname === path ? "bg-[#0E78F9]" : ""
      }`}
      href={path}
    >
      {renderIcon}
      {name}
    </Link>
  );
}

export default NavLink;
