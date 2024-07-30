export const createMeeting = async (
  client,
  callType,
  { date, descriptionInput, titleInput }
) => {
  const callId = crypto.randomUUID();

  const call = client.call(callType, callId);

  await call.getOrCreate({
    data: {
      custom: { title: titleInput, description: descriptionInput, date: date },
    },
  });
  return callId;
};
