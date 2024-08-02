"use client";
import { BookMarked, Copy, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { areDatesEqual, changeDateFormat } from "@/utils/date";
import UseQueyCalls from "@/app/hooks/queryCalls";
import { useUser } from "@clerk/nextjs";

const futureMeetings = [
  {
    title: "Team Sync: Sprint Planning & Updates",
    date: "March 15, 2024 - 10:00 AM",
  },
  {
    title: "Project Pulse Check: Weekly Standup ",
    date: "March 15, 2024 - 10:00 AM",
  },
];

function FutureMeetings() {
  const { user } = useUser();

  const { loading, allCalls } = UseQueyCalls(user.id);

  if (loading) {
    return (
      <div className=" mt-32 flex justify-center">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="mt-5">
      <section className="flex flex-col gap-y-2 justify-between sm:flex-row sm:gap-y-0">
        <h1 className="font-bold text-xl">Today's Upcoming Meetings</h1>
        <section className="text-[#ECF0FF]">See all</section>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        {allCalls.map((call, index) => {
          console.log("call.state.title", call.state.title);
          if (
            !call.state.startsAt ||
            !areDatesEqual(call.state.startsAt, new Date(Date.now()))
          ) {
            return;
          }

          return (
            <Meetings
              key={index}
              title={call.state.custom.title}
              startsAt={call.state.startsAt}
              previous={false}
              callId={call.id}
            />
          );
        })}
      </section>
    </div>
  );
}

export const Meetings = ({ title, startsAt, endedAt, previous, callId }) => {
  const { toast } = useToast();
  const date = previous ? endedAt.toDateString() : startsAt.toDateString();

  return (
    <div className="bg-[#1c1f2e] py-5 px-4 rounded">
      <BookMarked width={30} height={30} className="mb-4" />
      <h1 className="font-bold text-xl">{title}</h1>
      <section className="text-[#ECF0FF] mt-1">
        {previous ? `EndedAt: ${date}` : `StartsAt: ${date}`}
      </section>
      <section
        className={` ${
          previous ? "hidden" : "flex"
        } flex-col  gap-4 mt-4 sm:flex-row`}
      >
        <div className="bg-[#0E78F9] px-4 py-2  rounded cursor-pointer">
          Start
        </div>
        <div
          className="flex  gap-1 items-center bg-[#2a2e42] px-3 py-2 rounded  cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_MEETING_URL}/${callId}`
            );

            toast({
              title: "Copied to clipboard",
              className: "bg-[#2a6fc4] border-none text-white",
            });
          }}
        >
          Copy <Copy className="w-[18px] h-[18px] " />
        </div>
      </section>
    </div>
  );
};

export default FutureMeetings;
