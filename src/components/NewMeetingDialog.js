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
import { CalendarRange, Copy, Loader2, Router } from "lucide-react";
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
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";

const MeetingType = ({ type, members, setMeeting }) => {
  console.log(type, members);
  return (
    <>
      <Label className="text-left">Meeting type</Label>
      <div className="flex gap-5">
        <section className="flex items-center gap-2">
          <input
            type="checkbox"
            name="default"
            id="default"
            checked={type === "default" ? true : false}
            onChange={(e) => {
              if (e.target.checked) {
                setMeeting({
                  type: "default",
                  members,
                });
              }
            }}
          />
          <label htmlFor="default">Default</label>
        </section>
        <section className="flex items-center gap-2">
          <input
            type="checkbox"
            name="private"
            id="private"
            checked={type === "private" ? true : false}
            onChange={(e) => {
              if (e.target.checked) {
                setMeeting({
                  type: "private",
                  members,
                });
              }
            }}
          />
          <label htmlFor="private">Private</label>
        </section>
      </div>
      <div
        className={`${
          type === "private" ? "grid" : "hidden"
        } grid-cols-1 items-center gap-4`}
      >
        <Label htmlFor="members" className="text-left">
          Enter Meeting Members
        </Label>

        <Input
          id="members"
          value={members}
          onChange={(e) =>
            setMeeting({
              type,
              members: e.target.value,
            })
          }
          className="col-span-3 placeholder:text-gray-400"
          placeholder="Enter meeting members separating by comma"
        />
      </div>
    </>
  );
};
function NewMeetingDialog({ setIsOpen, isOpen, schedule }) {
  const [meetingLink, setMeetingLink] = useState("");
  const [createMeetingLoading, setCreateMeetingLoading] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [descriptionInput, setDescriptionInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [meeting, setMeeting] = useState({
    type: "default",
    members: "",
  });

  const client = useStreamVideoClient();
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        setIsOpen(false);
        setMeetingLink("");
        setDate();
        setDescriptionInput("");
        setTitleInput("");

        setMeeting({
          type: "default",
          members: "",
        });
      }}
    >
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
          <MeetingType
            type={meeting.type}
            members={meeting.members}
            setMeeting={setMeeting}
          />
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
        <DialogFooter className="flex flex-col">
          {createMeetingLoading && (
            <div
              className={`${
                createMeetingLoading ? "flex" : "hidden"
              } bg-gray-400 py-2 text-gray-200  items-center justify-center w-full cursor-not-allowed`}
            >
              Creating.... <Loader2 className="animate-spin" />
            </div>
          )}
          {schedule ? (
            <Button
              onClick={async () => {
                console.log({
                  date,
                  descriptionInput,
                  titleInput,
                  type: meeting.type,
                  members: meeting.members,
                });

                const callId = await createMeeting(
                  client,
                  { email: user.emailAddresses[0].emailAddress, id: user.id },
                  {
                    date,
                    descriptionInput,
                    titleInput,
                    type: meeting.type,
                    members: meeting.members,
                  },
                  setCreateMeetingLoading
                );

                setCreateMeetingLoading(false);

                console.log(callId);

                if (callId) {
                  setMeetingLink(
                    `${process.env.NEXT_PUBLIC_MEETING_URL}/${callId}`
                  );
                  toast({
                    title: "Call created",
                    description: `Your meeting is scheduled for ${date}`,
                    className: "bg-[#2a6fc4] border-none",
                  });
                } else {
                  toast({
                    title: "Uh oh! Something went wrong.",
                    description: "Meeting is not created. Please try again!",
                    className: "bg-[#2a6fc4] border-none",
                  });
                }
              }}
              className={`${
                ((meeting.type === "private" &&
                  meeting.members.split(",").length > 1) ||
                  meeting.type === "default") &&
                !createMeetingLoading
                  ? ""
                  : "hidden"
              } bg-[#0E78F9] w-full hover:bg-[#2a6fc4]`}
            >
              Create
            </Button>
          ) : (
            <Button
              onClick={async () => {
                console.log({
                  email: user.emailAddresses[0].emailAddress,
                  id: user.id,
                });

                const callId = await createMeeting(
                  client,
                  { email: user.emailAddresses[0].emailAddress, id: user.id },
                  {
                    date,
                    descriptionInput,
                    titleInput,
                    type: meeting.type,
                    members: meeting.members,
                  },
                  setCreateMeetingLoading
                );
                setCreateMeetingLoading(false);
                console.log(callId);

                if (!callId) {
                  toast({
                    title: "Uh oh! Something went wrong.",
                    description: "Meeting is not created. Please try again!",
                    className: "bg-[#2a6fc4] border-none",
                  });
                } else {
                  router.push(`/meeting/${callId}`);
                }
              }}
              className={`${
                ((meeting.type === "private" &&
                  meeting.members.split(",").length > 1) ||
                  meeting.type === "default") &&
                !createMeetingLoading
                  ? ""
                  : "hidden"
              } bg-[#0E78F9] w-full hover:bg-[#2a6fc4]`}
            >
              Create & Join
            </Button>
          )}

          <div
            className={`${
              meeting.type === "default" ||
              meeting.members.split(",").length > 1 ||
              createMeetingLoading
                ? "hidden"
                : "flex"
            } bg-gray-400 py-2 text-gray-500  items-center justify-center w-full cursor-not-allowed`}
          >
            Create & Join
          </div>
        </DialogFooter>
        <div
          className={`${
            meetingLink ? "flex" : "hidden"
          }  gap-1 items-center justify-center bg-[#2a2e42] hover:bg-[#32374e] px-3 py-2 rounded  cursor-pointer`}
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);

            toast({
              title: "Copied to clipboard",
              className: "bg-[#2a6fc4] border-none text-white",
            });
          }}
        >
          Copy <Copy className="w-[18px] h-[18px] " />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NewMeetingDialog;
