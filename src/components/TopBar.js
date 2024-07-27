"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { AlignJustify } from "lucide-react";
import React from "react";
import NavDrawer from "./NavDrawer";

function TopBar() {
  return (
    <header className="bg-[#1c1f2e] flex  px-5 py-3  w-full justify-between md:justify-end">
      <div className="block md:hidden">
        <NavDrawer side={"left"} />
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}

export default TopBar;
