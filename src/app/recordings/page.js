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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {allCalls.map((call, index) => (
        <Recording key={index} call={call} />
      ))}
    </div>
  );
}

export default Page;
