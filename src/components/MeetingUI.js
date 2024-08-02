import {
  CallControls,
  DeviceSettings,
  OwnCapability,
  SpeakerLayout,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useEffect } from "react";
import ParticipantsDrawer from "./ParticipantsDrawer";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function MeetingUI() {
  const {
    useCallCustomData,
    useMicrophoneState,
    useCameraState,
    useCallEndedAt,
    useCallStartsAt,
    useCallCallingState,
    useHasPermissions,
  } = useCallStateHooks();

  const custom = useCallCustomData();
  const micState = useMicrophoneState();
  const camState = useCameraState();
  const call = useCall();
  const router = useRouter();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const canEndCall = useHasPermissions(OwnCapability.END_CALL);
  const callingState = useCallCallingState();
  const { toast } = useToast();

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

  if (callStartsAt && new Date(callStartsAt) > new Date()) {
    return (
      <div className="my-20  text-red-900 flex justify-center text-2xl items-center">
        Call is in the future at {callStartsAt.toDateString()}
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

  if (callingState === "joining") {
    return (
      <div className="my-20 flex justify-center items-center">
        <section className="flex flex-col items-center gap-y-4">
          <Loader2 className="animate-spin h-16 w-16" />
          <section className="text-2xl">Joining meeting....</section>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="flex  flex-col gap-y-4  sm:flex-row sm:justify-between">
        <h1 className="font-bold text-4xl capitalize">{custom.title}</h1>
        <ParticipantsDrawer />
      </section>
      {callingState !== "joined" ? (
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
                try {
                  await call.join();
                } catch (error) {
                  if (error.status === 403) {
                    toast({
                      title: "Oh, something went wrong!",
                      description: `You are not allowed to join this meeting`,
                      className: "bg-[#2a6fc4] border-none",
                    });
                  } else {
                    toast({
                      title: "Oh, something went wrong!",
                      description: `Unable to join meeting. Please try again.`,
                      className: "bg-[#2a6fc4] border-none",
                    });
                  }
                }
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
            <div className={`${canEndCall ? "flex" : "hidden"} justify-center`}>
              <AlertDialog>
                <AlertDialogTrigger>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <p className="text-red-500 cursor-pointer hover:underline">
                          End call for everyone
                        </p>
                      </TooltipTrigger>
                      <TooltipContent className="text-white bg-[#1c1f2e]">
                        <p>This action can&#39;t be undone</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </AlertDialogTrigger>
                <AlertDialogContent className="text-white bg-[#0E78F9] border-none">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently ends
                      the call for all participants and can not be joined again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        await call.endCall();
                        router.push("/");
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MeetingUI;
