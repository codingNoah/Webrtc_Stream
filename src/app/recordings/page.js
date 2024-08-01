"use client";
import React from "react";
import UseQueyCalls from "@/app/hooks/queryCalls";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Recording from "@/components/Recording";
function Page() {
  const { user } = useUser();

  const { allCalls, loading } = UseQueyCalls(user.id);

  console.log(allCalls);
  if (loading) {
    return (
      <div className="my-20 flex justify-center items-center">
        <Loader2 className="animate-spin w-16 h-16" />
      </div>
    );
  }

  return (
    <div>
      {allCalls.map((call, index) => (
        <Recording key={index} call={call} />
      ))}
    </div>
  );
}

export default Page;
