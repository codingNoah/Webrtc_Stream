"use client";
import MeetingUI from "@/components/MeetingUI";
import {
  StreamTheme,
  StreamCall,
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
        const { calls } = await client.queryCalls({
          filter_conditions: {
            id: { $eq: callID },
          },
        });

        if (calls.length === 0) {
          setCallNotFound(true);
          return;
        }

        const currentCall = calls[0];

        setCall(currentCall);
      } catch (error) {
        console.log(error);

        setCallNotFound(true);
      }
    };

    loadCall();
  }, [callID, client]);

  if (callNotFound) {
    return (
      <div className="text-2xl h-full flex justify-center items-center">
        Call with id: {callID} not found
      </div>
    );
  }

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
