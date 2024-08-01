"use client";
import React, { useEffect, useState } from "react";

function useQueryRecordings(call) {
  const [loading, setLoading] = useState(true);
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    const loadRecordings = async () => {
      try {
        const recordings = await call.queryRecordings();
        setRecordings(recordings);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadRecordings();
  }, [call]);

  return {
    recordings,
    loading,
  };
}

export default useQueryRecordings;
