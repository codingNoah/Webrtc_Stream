"use client";
import React, { useEffect, useState } from "react";

function UpcomingMeeting() {
  const [localDate, setLocalDate] = useState(new Date().toLocaleString());
  // const localDate = new Date().toLocaleString();
  const localDate2 = new Date().toDateString();
  console.log(localDate);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocalDate(new Date().toLocaleString());
    }, 60000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="p-5 rounded-2xl bg-[#1c1f2e]">
      <section className="mt-16">
        <h1 className="font-bold text-2xl">
          {localDate?.split(",")[1]?.split(" ")[1]}
          <span className="text-sm">
            {" "}
            {localDate?.split(",")[1]?.split(" ")[2]}
          </span>
        </h1>
        <div>{localDate2}</div>
      </section>
    </div>
  );
}

export default UpcomingMeeting;
