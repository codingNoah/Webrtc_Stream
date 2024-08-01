"use client";

import useQueryRecordings from "@/app/hooks/queryRecordings";
import React from "react";

function Recording({ call }) {
  const { loading, recordings } = useQueryRecordings(call);

  //   if (loading) return;

  console.log(call.state.custom.title);
  const displayRecordings = recordings.recordings ? recordings.recordings : [];
  return (
    <div>
      <h1>{call.state.custom.title}</h1>
      {displayRecordings.length === 0 && <div>No recording</div>}
      {displayRecordings.map((rec, index) => (
        <div key={index}>
          <section>{rec.filename}</section>
          <a target="_blank" href={rec.url}>
            Play
          </a>
          {/* <video src={rec.url} /> */}
        </div>
      ))}
    </div>
  );
}

export default Recording;
