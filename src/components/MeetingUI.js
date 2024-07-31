import {
  CallControls,
  CallParticipantsList,
  DeviceSettings,
  PaginatedGridLayout,
  SpeakerLayout,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import ParticipantsDrawer from "./ParticipantsDrawer";
import { useRouter } from "next/navigation";

function MeetingUI() {
  const {
    useCallCustomData,
    useMicrophoneState,
    useCameraState,
    useCallEndedAt,
    useCallEndedBy,
  } = useCallStateHooks();
  const [setupCompleted, setSetupCompleted] = useState(false);

  const custom = useCallCustomData();
  const micState = useMicrophoneState();
  const camState = useCameraState();
  const call = useCall();
  const router = useRouter();
  const callEndedBy = useCallEndedBy();
  const callEndedAt = useCallEndedAt();

  console.log(callEndedAt, callEndedBy);

  useEffect(() => {
    call.camera.disable();
    call.microphone.disable();
  }, [call.camera, call.microphone]);

  if (callEndedAt) {
    return (
      <div className="my-20  text-red-900 flex justify-center text-2xl items-center">
        Call has ended
      </div>
    );
  }

  if (!micState.hasBrowserPermission || !camState.hasBrowserPermission) {
    return (
      <div className="text-center  py-20 text-xl">
        Please grant camera and audio access to join the meeting.
      </div>
    );
  }

  return (
    <div>
      <section className="flex  flex-col gap-y-4  sm:flex-row sm:justify-between">
        <h1 className="font-bold text-4xl capitalize">{custom.title}</h1>
        <ParticipantsDrawer />
      </section>
      {!setupCompleted ? (
        <div className="flex flex-col justify-center items-center mt-16">
          <div className="w-full sm:w-[500px] ">
            <VideoPreview className="w-full" />
          </div>
          <div className="mt-10 flex flex-col items-center gap-y-2">
            <DeviceSettings className="mx-auto" />
            <label className="block">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    call.camera.enable();
                    call.microphone.enable();
                  } else {
                    call.camera.disable();
                    call.microphone.disable();
                  }
                }}
              />
              Join with mic and camera turned on/off
            </label>
            <div
              className="bg-[#0E78F9] px-4 py-2 rounded cursor-pointer mt-4"
              onClick={async () => {
                setSetupCompleted(true);
                await call.join();
              }}
            >
              Join Meeting
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className=" px-5 py-4 rounded  ">
            <SpeakerLayout />
            <CallControls
              onLeave={() => router.push("/")}
              className="text-white"
            />
            <div
              className=""
              onClick={async () => {
                console.log("Ending...");
                await call.endCall();
                console.log("Call ended");
              }}
            >
              End Call For Everyone
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MeetingUI;
