"use client";
import React, { useEffect, useState } from "react";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";

import { tokenProvider } from "@/app/actions";
import { Loader2 } from "lucide-react";

function StreamVideoProvider({ children }) {
  const [videoClient, setVideoClient] = useState();

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY,
      user: {
        id: user.id,
        name: user.fullName,
        image: user.imageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser();
      setVideoClient(null);
    };
  }, [user?.id, user]);

  if (!videoClient) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-white w-14 h-14" />
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}

export default StreamVideoProvider;
