const shopSchedule = require("./shop.json");

const date = new Date();

const currentTime = "12:00";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// const currentTime = date.toLocaleString("en-US", {
//   hour12: false,
//   hour: "2-digit",
//   minute: "2-digit",
// });

const currentDays = date.getDay();

const currentWeekDay = "Tue";
// const currentWeekDay = date.toDateString().split(" ")[0];

console.log(currentTime, currentWeekDay);

const currentDayData = shopSchedule.find((day) => day.day === currentWeekDay);

const valid = (day) => shopSchedule.find((i) => i.day === day);

const hourDifference = () => {
  const checkTime = +currentTime.split(":")[0];
  if (checkTime < 7) return 7 - checkTime;
  if (checkTime >= 19) return 24 - checkTime + 7;
  return 19 - checkTime;
};

const calculateSkipDay = () => {
  let count = 1;
  for (let i = days.indexOf(currentWeekDay); i < days.length; i += 1) {
    const check = days.indexOf(currentWeekDay);
    let index = check + count;
    if (index === 7) index = 0;

    const exist = valid(days[index]);

    if (exist) {
      break;
    } else {
      count += 1;
    }
  }
  return count;
};
const shoOpenClose = () => {
  const time =
    new Date(`${currentDays} 19:00`) >=
      new Date(`${currentDays} ${currentTime}`) &&
    new Date(`${currentDays} 7:00`) <=
      new Date(`${currentDays} ${currentTime}`);

  if (currentDayData && time) {
    return console.log(
      `open,The shop will be closed within ${hourDifference()}Hrs`
    );
  }
  if (currentDayData && !time) {
    if (
      new Date(`${currentDays} 7:00`) >=
      new Date(`${currentDays} ${currentTime}`)
    ) {
      return console.log(
        `Close,The shop will be open within ${hourDifference()}Hrs`
      );
    }
    const count = calculateSkipDay();
    return console.log(
      `Close,The shop will be Open within ${
        hourDifference() + 24 * (count - 1)
      }Hrs`
    );
  }
  if ((!currentDayData && time) || (!currentDayData && !time)) {
    const count = calculateSkipDay();
    return console.log(
      `Close,The shop will be Open within ${
        24 - +currentTime.split(":")[0] + (count - 1) * 24 + 7
      } Hrs`
    );
  }
  return console.log(
    `Closed. The shop will be open after ${hourDifference()} Hrs`
  );
};

shoOpenClose();
