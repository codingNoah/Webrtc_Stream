"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function JoinMeetingDialog({ setIsOpen, isOpen }) {
  const [link, setLink] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  console.log(link);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        setLink("");
      }}
    >
      <DialogContent
        className="sm:max-w-[425px] text-white bg-[#131622] border border-[#0E78F9]  "
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <DialogTitle>Join Meeting</DialogTitle>
          <DialogDescription id="dialog-description"></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-x-5">
            <Input
              id="link"
              placeholder="Meeting Link"
              value={link}
              onChange={(e) => {
                console.log(e.target.value);
                setLink(e.target.value);
              }}
              className="col-span-3 placeholder:text-gray-500"
            />
            <Button
              className="col-span-1 bg-[#0E78F9] w-full hover:bg-[#2a6fc4]"
              onClick={() => {
                const regex = /^http:\/\/localhost:3000\/meeting\/([^\/]+)$/;
                const match = link.match(regex);

                if (match && match[0]) {
                  router.push(link);
                } else {
                  console.log(match);
                  toast({
                    title: "Uh oh! Something went wrong.",
                    description: "The meeting link is incorrect",
                    className: "bg-[#2a6fc4] border-none",
                  });
                }
              }}
            >
              Join
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default JoinMeetingDialog;
