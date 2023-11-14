const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedneseday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getWeekDay = (date) => {
  const day = DAYS[new Date(date * 1000).getDay()];

  return day;
};

export default getWeekDay;
