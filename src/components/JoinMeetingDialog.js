"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
function JoinMeetingDialog({ setIsOpen, isOpen }) {
  const [link, setLink] = useState("");
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] text-white bg-[#131622] border border-[#0E78F9]  ">
        <DialogHeader>
          <DialogTitle>Join Meeting</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-x-5">
            <Input
              id="link"
              placeholder="Meeting Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="col-span-3 placeholder:text-gray-500"
            />
            <Button className="col-span-1 bg-[#0E78F9] w-full hover:bg-[#2a6fc4]">
              Join
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default JoinMeetingDialog;
