import { getUsers } from "@/app/actions";

export const createMeeting = async (
  client,
  creator,
  { date, descriptionInput, titleInput, type, members }
) => {
  try {
    const callId = crypto.randomUUID();

    const call = client.call(type, callId);

    console.log(creator, members);
    const emails = members
      .split(",")
      .map((member) => member.trim())
      .filter((m) => m !== creator.email);
    console.log("emails", emails);

    const memberIds = await getUsers(emails);
    console.log(memberIds);

    const modifiedMembers = memberIds.map((id) => {
      return { user_id: id, role: "call_member" };
    });

    modifiedMembers.push({ user_id: creator.id, role: "admin" });

    console.log(modifiedMembers);

    await call.getOrCreate({
      data: {
        custom: { title: titleInput, description: descriptionInput },
        startsAt: date ? date : new Date(),
        members: modifiedMembers,
      },
    });

    return callId;
  } catch (error) {
    console.log(error);
  }
};
