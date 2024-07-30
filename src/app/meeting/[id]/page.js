"use client";
import MeetingUI from "@/components/MeetingUI";
import {
  StreamTheme,
  StreamCall,
  PaginatedGridLayout,
  CallControls,
  useCall,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

function Meeting({ params }) {
  const [callNotFound, setCallNotFound] = useState(false);

  const [call, setCall] = useState();

  const callID = params.id;
  const client = useStreamVideoClient();

  useEffect(() => {
    const loadCall = async () => {
      try {
        const currentCall = client.call("default", callID);

        console.log(currentCall);
        await currentCall.get();

        setCall(currentCall);
      } catch (error) {
        console.log(error);

        setCallNotFound(true);
      }
    };

    loadCall();
  }, [callID, client]);

  if (!call) {
    return (
      <div className="h-full flex justify-center items-center">
        {" "}
        <Loader2 className="animate-spin" />{" "}
      </div>
    );
  }
  return (
    <StreamTheme className={"light"}>
      <StreamCall call={call}>
        <MeetingUI />
      </StreamCall>
    </StreamTheme>
  );
}

export default Meeting;
