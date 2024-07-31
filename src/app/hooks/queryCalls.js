import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

function UseQueyCalls(userId) {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const client = useStreamVideoClient();

  useEffect(() => {
    const loadCalls = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          $or: [{ created_by_user_id: userId }, { members: { $in: [userId] } }],
        },
        limit: 10,
        watch: true,
      });
      setCalls(calls);
      setLoading(false);
    };

    loadCalls();
  }, [client, userId]);

  const upcomingCalls = calls.filter(
    (call) => call.state.startsAt && new Date(call.state.startsAt) > new Date()
  );
  const previousCalls = calls.filter((call) => call.state.endedAt);

  return {
    loading,
    upcomingCalls,
    previousCalls,
  };
}

export default UseQueyCalls;
