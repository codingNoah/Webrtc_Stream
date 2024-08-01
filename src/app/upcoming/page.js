"use client";
import React, { useState } from "react";
import { Meetings } from "@/components/FutureMeetings";
import UseQueyCalls from "../hooks/queryCalls";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";


function Page() {
  const { user } = useUser();
  const { upcomingCalls, loading } = UseQueyCalls(user.id);

  if (loading) {
    return (
      <div className="my-20 flex justify-center items-center">
        <Loader2 className="animate-spin w-16 h-16" />
      </div>
    );
  }
  return (
    <main>
      <h1 className="font-bold text-xl mb-4">Upcoming Meetings</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingCalls.map((call, index) => {
          return (
            <Meetings
              key={index}
              title={call.state.custom.title}
              startsAt={call.state.startsAt}
              endedAt={call.state.endedAt}
              previous={false}
              callId={call.id}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Page;
