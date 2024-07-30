"use client";
import { BookMarked, Plus, User, Video } from "lucide-react";
import React, { useState } from "react";

import NewMeetingDialog from "./NewMeetingDialog";
import JoinMeetingDialog from "./JoinMeetingDialog";
function MeetingSection({ title, description, icon, color }) {
  const [isOpen, setIsOpen] = useState(false);

  let renderedIcon;
  let showDialog;

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
  console.log("title", title);
  switch (title) {
    case "New Meeting":
      showDialog = (
        <NewMeetingDialog
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          schedule={false}
        />
      );
      break;
    case "Schedule Meeting":
      showDialog = (
        <NewMeetingDialog
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          schedule={true}
        />
      );
      break;
    case "Join Meeting":
      showDialog = <JoinMeetingDialog setIsOpen={setIsOpen} isOpen={isOpen} />;
      break;
  }

  return (
    <div
      className={` rounded-xl px-3 py-2.5 cursor-pointer`}
      style={{ background: color }}
      onClick={() => setIsOpen(true)}
    >
      {showDialog}
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
