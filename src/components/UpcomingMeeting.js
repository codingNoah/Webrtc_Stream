import React from "react";

function UpcomingMeeting() {
  return (
    <div className="p-5 rounded-2xl bg-[#1c1f2e]">
      <section className="mb-16">
        <span className="bg-[#3e4464] px-3 py-2 rounded">
          Upcoming meeting at: 12:30PM
        </span>
      </section>
      <section className="">
        <h1 className="font-bold text-2xl">
          12:04
          <span className="text-sm"> PM</span>
        </h1>
        <div>Friday, 19 March 2024</div>
      </section>
    </div>
  );
}

export default UpcomingMeeting;
