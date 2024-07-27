"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import SideBar from "./SideBar";
import NavLink from "./NavLink";
import { links } from "@/constants/links";

const SHEET_SIDES = ["top", "right", "bottom", "left"];

function NavDrawer({ side }) {
  // console.log("running....")
  return (
    <Sheet key={side}>
      <SheetTrigger asChild>
        <AlignJustify />
      </SheetTrigger>
      <SheetContent
        className="w-[264px] p-0 text-white block md:hidden"
        side={side}
      >
        <nav className="bg-[#1c1f2e] h-full">
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
      </SheetContent>
    </Sheet>
  );
}

export default NavDrawer;
