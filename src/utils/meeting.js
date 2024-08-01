import { getUsers } from "@/app/actions";

export const createMeeting = async (
  client,
  creator,
  { date, descriptionInput, titleInput, type, members },
  setCreateMeetingLoading
) => {
  try {
    setCreateMeetingLoading(true);
    const callId = crypto.randomUUID();

    const call = client.call(type, callId);

    const emails = members
      .split(",")
      .map((member) => member.trim())
      .filter((m) => m !== creator.email);

    const memberIds = await getUsers(emails);

    const modifiedMembers = memberIds.map((id) => {
      return { user_id: id, role: "call_member" };
    });

    modifiedMembers.push({ user_id: creator.id, role: "admin" });

    const data =
      type === "default"
        ? {
            custom: { title: titleInput, description: descriptionInput },
            starts_at: date
              ? new Date(date).toISOString()
              : new Date(Date.now()).toISOString(),
          }
        : {
            custom: { title: titleInput, description: descriptionInput },
            starts_at: date
              ? new Date(date).toISOString()
              : new Date(Date.now()).toISOString(),
            members: modifiedMembers,
          };

    await call.getOrCreate({
      data: data,
    });

    return callId;
  } catch (error) {
    return null;
  }
};

export const queryCalls = async (client, userId) => {
  const { calls } = await client.queryCalls({
    filter_conditions: {
      $or: [{ created_by_user_id: userId }, { members: { $in: [userId] } }],
    },
    limit: 10,
    watch: true,
  });

  return calls;
};
