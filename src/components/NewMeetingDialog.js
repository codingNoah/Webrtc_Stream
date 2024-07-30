"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CalendarRange, Router } from "lucide-react";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "./ui/textarea";
import { createMeeting } from "@/utils/meeting";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
function NewMeetingDialog({ setIsOpen, isOpen, schedule }) {
  const [date, setDate] = useState();
  const [descriptionInput, setDescriptionInput] = useState("");
  const [titleInput, setTitleInput] = useState("");

  const client = useStreamVideoClient();
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] text-white bg-[#131622] border border-[#0E78F9]  ">
        <DialogHeader>
          <DialogTitle>
            {schedule ? "Schedule Meeting" : "Create Meeting"}
          </DialogTitle>
          <DialogDescription id="dialog-description"></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>

            <Input
              id="title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="col-span-3 placeholder:text-gray-400"
              placeholder="Meeting title"
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>

            <Textarea
              id="description"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              className="col-span-3 placeholder:text-gray-400"
              placeholder="Meeting description"
            />
          </div>
          <div
            className={`${
              schedule ? "grid" : "hidden"
            }  grid-cols-1 items-center gap-4`}
          >
            <Label htmlFor="date" className="text-left">
              Select Date & Time
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarRange className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 text-white bg-[#131622]"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  fromDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              const callId = await createMeeting(client, "default", {
                date,
                descriptionInput,
                titleInput,
              });
              console.log(callId);
              router.push(`/meeting/${callId}`);
            }}
            className="bg-[#0E78F9] w-full hover:bg-[#2a6fc4]"
          >
            Create & Join
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewMeetingDialog;
