export const changeDateFormat = (dateString) => {
  if (!dateString) {
    return;
  }
  const date = new Date(dateString);

  // Options for date formatting
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  // Extract the formatted date parts
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  // Convert hours to 12-hour format and determine AM/PM
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM

  // Extract the time zone abbreviation
  const timeZone = date.toTimeString().match(/\(([^)]+)\)/)[1];

  // Construct the formatted date string
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${amPm} ${timeZone}`;

  return formattedDate;
};

export const calculateTimeDifference = (dateOne, dateTwo) => {
  const date1 = new Date(dateOne);
  const date2 = new Date(dateTwo);

  const diffInMs = date1 - date2;
  const diffInSeconds =
    Math.floor(diffInMs / 1000) === 0
      ? ""
      : `${Math.floor(diffInMs / 1000)} sec`;
  const diffInMinutes =
    diffInSeconds || Math.floor(diffInSeconds / 60) === 0
      ? ""
      : `${Math.floor(diffInSeconds / 60)} min`;
  const diffInHours =
    diffInMinutes || Math.floor(diffInMinutes / 60) === 0
      ? ""
      : `${Math.floor(diffInMinutes / 60)} hr`;

  return `${diffInHours} ${diffInMinutes} ${diffInSeconds}`;
};
