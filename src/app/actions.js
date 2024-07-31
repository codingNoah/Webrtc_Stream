"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";

import { StreamClient } from "@stream-io/node-sdk";

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("user not found");

  if (!process.env.NEXT_PUBLIC_STREAM_API_KEY || !process.env.STREAM_SECRET_KEY)
    throw new Error("Env not set");

  const streamClient = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_API_KEY,
    process.env.STREAM_SECRET_KEY
  );

  const token = streamClient.createToken(user.id);

  return token;
};

export const getUsers = async (emailAddress) => {
  const response = await clerkClient.users.getUserList({
    emailAddress: emailAddress,
  });

  return response.data.map((user) => user.id);
};
