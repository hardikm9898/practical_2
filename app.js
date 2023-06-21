const shopSchedule = require("./shop.json");
const date = new Date();
// const currentTime = "18:00";
const currentTime = date.toLocaleString("en-US", {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
});

const currentDays = date.getDay();

// const currentWeekDay = "Mon";
const currentWeekDay = date.toDateString().split(" ")[0];


console.log(currentTime, currentWeekDay);

const currentDayData = shopSchedule.find((day) => {
  return day.day === currentWeekDay;
});

const shoOpenClose = function () {
  const time =
    new Date(`${currentDays} 19:00`) >=
      new Date(`${currentDays} ${currentTime}`) &&
    new Date(`${currentDays} 7:00`) <=
      new Date(`${currentDays} ${currentTime}`);

  if (currentDayData && time) {
    return console.log("open");
  } else {
    console.log("close");
  }
};
shoOpenClose();
