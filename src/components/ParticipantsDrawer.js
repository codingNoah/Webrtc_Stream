import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";

import { CallParticipantsList } from "@stream-io/video-react-sdk";

function ParticipantsDrawer() {
  return (
    <Sheet key={"right"}>
      <SheetTrigger asChild>
        <div className=" cursor-pointer hover:underline">Participants</div>
      </SheetTrigger>

      <SheetContent
        className="w-[264px] bg-[#1c1f2e]  overflow-y-auto px-2 py-6  text-white "
        side={"right"}
      >
        <CallParticipantsList />
      </SheetContent>
    </Sheet>
  );
}

export default ParticipantsDrawer;
