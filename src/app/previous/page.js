import React from "react";
import { FutureMeeting } from "@/components/FutureMeetings";
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
function page() {
  return (
    <div>
      <main>
        <h1 className="font-bold text-xl mb-4">Previous Meetings</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {futureMeetings.map(({ title, date }, index) => {
            return (
              <FutureMeeting
                key={index}
                title={title}
                date={date}
                previous={true}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default page;
