import FutureMeetings from "@/components/FutureMeetings";
import MeetingSection from "@/components/MeetingSection";
import UpcomingMeeting from "@/components/UpcomingMeeting";
import { meetingTypes } from "@/constants/meetingTypes";

export default function Home() {
  return (
    <main>
      <UpcomingMeeting />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-5">
        {meetingTypes.map(({ title, description, icon, color }, index) => {
          return (
            <MeetingSection
              key={index}
              title={title}
              description={description}
              icon={icon}
              color={color}
            />
          );
        })}
      </section>
      <FutureMeetings />
    </main>
  );
}
