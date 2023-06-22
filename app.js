const shopSchedule = require("./shop.json");

const date = new Date();

// const currentTime = "22:00"; // For check Testcase

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const currentTime = date.toLocaleString("en-US", {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
});

const currentDays = date.getDay(); // Current Time

// const currentWeekDay = "Sat";  // For check TestCase
const currentWeekDay = date.toDateString().split(" ")[0]; // Current WeekDay Name

console.log(currentTime, currentWeekDay);

const currentDayData = shopSchedule.find((day) => day.day === currentWeekDay);

const valid = (day) => shopSchedule.find((i) => i.day === day);

function convertTo24Hour(time) {
  const timeArray = time.split(/:| /);
  let hours = parseInt(timeArray[0], 10);
  const minutes = parseInt(timeArray[1], 10);
  const period = timeArray[2].toLowerCase();

  if (period === "pm" && hours !== 12) {
    hours += 12;
  } else if (period === "am" && hours === 12) {
    hours = 0;
  }

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Return the time in 24-hour format
  return { formattedHours, formattedMinutes };
}

// Usage example

const hourDifference = (openingHour, closingHour) => {
  const checkTime = +currentTime.split(":")[0];
  if (checkTime < openingHour) return openingHour - checkTime;
  if (checkTime >= closingHour) return 24 - checkTime + openingHour;
  return closingHour - checkTime;
};

const calculateSkipDay = () => {
  let count = 1;
  let exist;
  for (let i = days.indexOf(currentWeekDay); i < days.length; i += 1) {
    const check = days.indexOf(currentWeekDay);
    let index = check + count;
    if (index === 7) index = 0;

    exist = valid(days[index]);

    if (exist) {
      break;
    } else {
      count += 1;
    }
  }
  return { count, exist };
};
const hoursToDaysCalculate = (hours) => {
  const day = Math.floor(hours / 24);
  const hour = hours % 24;
  return `${day} days ${hour}`;
};

const shoOpenClose = () => {
  let openingHour;
  let closingHour;
  if (currentDayData) {
    openingHour = +convertTo24Hour(currentDayData.open).formattedHours;
    closingHour = +convertTo24Hour(currentDayData.close).formattedHours;
  }
  const time =
    new Date(`${currentDays} 19:00`) >
      new Date(`${currentDays} ${currentTime}`) &&
    new Date(`${currentDays} 7:00`) <=
      new Date(`${currentDays} ${currentTime}`);

  if (currentDayData && time) {
    return console.log(
      `open,The shop will be closed within ${hoursToDaysCalculate(
        hourDifference(openingHour, closingHour)
      )}Hrs`
    );
  }
  if (currentDayData && !time) {
    console.log(openingHour, closingHour);
    if (
      new Date(`${currentDays} ${openingHour}:00`) >=
      new Date(`${currentDays} ${currentTime}`)
    ) {
      return console.log(
        `Close,The shop will be open within ${hoursToDaysCalculate(
          hourDifference(openingHour, closingHour)
        )}Hrs`
      );
    }
    const count = calculateSkipDay();

    return console.log(
      `Close,The shop will be Open within ${hoursToDaysCalculate(
        hourDifference(openingHour, closingHour) + 24 * (count.count - 1)
      )}Hrs`
    );
  }
  if ((!currentDayData && time) || (!currentDayData && !time)) {
    const { count, exist } = calculateSkipDay();
    openingHour = +convertTo24Hour(exist.open).formattedHours;
    return console.log(
      `Close,The shop will be Open within ${hoursToDaysCalculate(
        24 - +currentTime.split(":")[0] + (count - 1) * 24 + openingHour
      )} Hrs`
    );
  }

  console.log(openingHour, closingHour);
  return console.log(
    `Closed. The shop will be open after ${hoursToDaysCalculate(
      hourDifference(openingHour, closingHour)
    )} Hrs`
  );
};

shoOpenClose();
