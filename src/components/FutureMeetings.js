import { BookMarked, Copy } from "lucide-react";
import React from "react";

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
  return (
    <div className="mt-5">
      <section className="flex flex-col gap-y-2 justify-between sm:flex-row sm:gap-y-0">
        <h1 className="font-bold text-xl">Today's Upcoming Meetings</h1>
        <section className="text-[#ECF0FF]">See all</section>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        {futureMeetings.map(({ title, date }, index) => {
          return (
            <Meetings key={index} title={title} date={date} previous={false} />
          );
        })}
      </section>
    </div>
  );
}

export const Meetings = ({ title, startsAt, endedAt, previous, callId }) => {
  return (
    <div className="bg-[#1c1f2e] py-5 px-4 rounded">
      <BookMarked width={30} height={30} className="mb-4" />
      <h1 className="font-bold text-xl">{title}</h1>
      <section className="text-[#ECF0FF] mt-1">
        {previous ? `EndedAt: ${endedAt}` : `StartsAt: ${startsAt}`}
      </section>
      <section
        className={` ${
          previous ? "hidden" : "flex"
        } flex-col  gap-4 mt-4 sm:flex-row`}
      >
        <div className="bg-[#0E78F9] px-4 py-2  rounded cursor-pointer">
          Start
        </div>
        <div className="flex  gap-1 items-center bg-[#2a2e42] px-3 py-2 rounded  cursor-pointer">
          <Copy className="w-[18px] h-[18px] " /> Copy Invitation{" "}
          {`${process.env.NEXT_PUBLIC_MEETING_URL}/${callId}`}
        </div>
      </section>
    </div>
  );
};

export default FutureMeetings;
