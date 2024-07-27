import { BookMarked, Plus, User, Video } from "lucide-react";
import React from "react";

function MeetingSection({ title, description, icon, color }) {
  let renderedIcon;

  console.log("color", color);

  switch (icon) {
    case "Plus":
      renderedIcon = <Plus />;
      break;
    case "User":
      renderedIcon = <User />;
      break;
    case "Video":
      renderedIcon = <Video />;
      break;
    case "BookMarked":
      renderedIcon = <BookMarked />;
      break;
  }

  return (
    <div
      className={` rounded-xl px-3 py-2.5 cursor-pointer`}
      style={{ background: color }}
    >
      <section className="mb-12 w-12 h-12 flex items-center rounded-xl justify-center bg-gray-300">
        {renderedIcon}
      </section>
      <section>
        <h1 className="font-bold text-xl">{title}</h1>
        <div className="text-sm">{description}</div>
      </section>
    </div>
  );
}

export default MeetingSection;
