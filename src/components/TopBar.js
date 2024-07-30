"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import NavDrawer from "./NavDrawer";

function TopBar() {
  return (
    <header className="bg-[#1c1f2e] flex  px-5 py-3 z-50  w-full justify-between sticky top-0 md:justify-end">
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
