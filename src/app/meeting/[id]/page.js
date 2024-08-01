"use client";
import MeetingUI from "@/components/MeetingUI";
import {
  StreamTheme,
  StreamCall,
  PaginatedGridLayout,
  CallControls,
  useCall,
  useStreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { OwnCapability } from "@stream-io/video-react-sdk";

function Meeting({ params, searchParams }) {
  const [callNotFound, setCallNotFound] = useState(false);

  const [call, setCall] = useState();

  const callID = params.id;
  const client = useStreamVideoClient();
  const { useHasPermissions } = useCallStateHooks();

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

        console.log(calls[0].type, callID);
        const currentCall = client.call(searchParams.type, callID);

        const canJoin = currentCall.permissionsContext.hasPermission(
          OwnCapability.JOIN_CALL
        );

        console.log("canJoin", canJoin);

        // console.log(canJoin);

        // if (!canJoin) {
        //   throw new Error("");
        // }

        setCall(currentCall);
      } catch (error) {
        console.log(error);

        setCallNotFound(true);
      }
    };

    loadCall();
  }, [callID, client, searchParams.type]);

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
