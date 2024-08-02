"use client";

import useQueryRecordings from "@/app/hooks/queryRecordings";
import { calculateTimeDifference } from "@/utils/date";
import { Video } from "lucide-react";
import React from "react";

function Recording({ call }) {
  const { loading, recordings } = useQueryRecordings(call);

  //   if (loading) return;

  console.log(call.state.custom.title);
  const displayRecordings = recordings.recordings ? recordings.recordings : [];
  console.log(displayRecordings.length > 0 ? displayRecordings : "nothing");

  return (
    <div
      className={`${
        displayRecordings.length > 0 ? "" : "hidden"
      } bg-[#1c1f2e] px-4 py-5 rounded`}
    >
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold">{call.state.custom.title}</h1>
        <section>
          <Video />
        </section>
      </div>
      {displayRecordings.map((rec, index) => (
        <div key={index}>
          <section className="text-sm text-gray-400 mb-2 break-words">
            {rec.filename}
          </section>
          <section className="text-gray-400 mb-3">
            duration: {calculateTimeDifference(rec.end_time, rec.start_time)}
          </section>
          <a
            className="bg-[#0E78F9] hover:bg-[#4196fd] px-4 py-3 block w-20 text-center rounded text-xl"
            target="_blank"
            href={rec.url}
          >
            Play
          </a>
          {/* <video src={rec.url} /> */}
        </div>
      ))}
    </div>
  );
}

export default Recording;
