"use client";
import React, { useEffect, useState } from "react";
import { Meetings } from "@/components/FutureMeetings";
import { queryCalls } from "@/utils/meeting";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import UseQueyCalls from "../hooks/queryCalls";
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
function Page() {
  const { user } = useUser();
  const { previousCalls, loading } = UseQueyCalls(user.id);

  if (loading) {
    return (
      <div className="my-20 flex justify-center items-center">
        <Loader2 className="animate-spin w-16 h-16" />
      </div>
    );
  }

  return (
    <div>
      <main>
        <h1 className="font-bold text-xl mb-4">Previous Meetings</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {previousCalls.map(({ state }, index) => {
            console.log(state.startsAt);
            return (
              <Meetings
                key={index}
                title={state.custom.title}
                startsAt={state.startsAt}
                endedAt={state.endedAt}
                previous={true}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default Page;
