// floor has passed, ceiling in future
const t1 = new Date("2023-03-01T10:03:00.000Z"); // 10:03am
const t2 = new Date("2023-03-01T11:30:00.000Z"); // 11:30am
const t3 = new Date("2023-03-01T14:32:00.000Z"); // 2:32pm

// floor has passed, ceiling has passed
const t4 = new Date("2023-03-01T10:00:00.000Z"); // 10:00am
const t5 = new Date("2023-03-01T11:30:00.000Z"); // 11:30am
const t6 = new Date("2023-03-01T11:00:00.000Z"); // 11:00am

// floor in future, ceiling in future
const t7 = new Date("2023-03-01T14:01:00.000Z"); // 2:01pm
const t8 = new Date("2023-03-01T14:23:00.000Z"); // 2:23pm
const t9 = new Date("2023-03-01T14:42:00.000Z"); // 2:42pm

// floor in future, ceiling in future
const t10 = new Date("2023-03-01T11:45:00.000Z"); // 11:45am
const t11 = new Date("2023-03-01T11:33:00.000Z"); // 11:33am
const t12 = new Date("2023-03-01T14:30:00.000Z"); // 2:30pm

// floor in future, ceiling in future
const t13 = new Date("2023-03-01T11:45:00.000Z"); // 11:45am
const t14 = new Date("2023-03-01T10:33:00.000Z"); // 10:33am
const t15 = new Date("2023-03-01T14:30:00.000Z"); // 2:30pm

// floor in future, ceiling in future
const t16 = new Date("2023-03-01T11:45:00.000Z"); // 11:45am
const t17 = new Date("2023-03-01T10:33:00.000Z"); // 10:33am
const t18 = new Date("2023-03-01T12:13:00.000Z"); // 12:13pm

// floor in future, ceiling in future
const t19 = new Date("2023-03-01T10:45:00.000Z"); // 10:45am
const t20 = new Date("2023-03-01T10:33:00.000Z"); // 10:33am
const t21 = new Date("2023-03-01T10:55:00.000Z"); // 10:55am

function formatTime(floor, now, ceiling) {
  // get time differences for lower and upper bounds
  const timeToFloor = floor - now;
  const timeToCeiling = ceiling - now;

  // floor has passed, ceiling has passed
  if (timeToFloor <= 0 && timeToCeiling <= 0) {
    return "as soon as possible";
  }

  // floor has passed, ceiling in future
  if (timeToFloor <= 0 && timeToCeiling > 0) {
    const minutes = timeToCeiling / 1000 / 60;
    const hours = minutes >= 120 ? "2h" : minutes / 60;

    if (hours === "2h") return hours;
    if (hours === 1) return ["1h", toFive(minutes) + "m"].join("-");
    return toFive(minutes) + "m";
  }

  // floor in future, ceiling in future
  if (timeToFloor > 0 && timeToCeiling > 0) {
    const minutesCeiling = timeToCeiling / 1000 / 60;
    const hoursCeiling =
      minutesCeiling >= 120 ? "2h" : Math.floor(minutesCeiling / 60);

    const minutesFloor = timeToFloor / 1000 / 60;
    const hoursFloor =
      minutesFloor >= 120 ? "2h" : Math.floor(minutesFloor / 60);

    // Enumerate through all possible combinations:

    // minutesFloor > 2h return 2h
    if (minutesFloor >= 120) return "2h";

    // minutesFloor 1hr+ ahead
    if (minutesFloor >= 60 && hoursCeiling === "2h") {
      return ["1h" + toFive(minutesFloor % 60) + "m", hoursCeiling].join("-");
    }

    // minutesFloor 1hr+ ahead and hoursCeiling === 1
    if (minutesFloor >= 60 && hoursCeiling === 1) {
      return [
        "1h" + toFive(minutesFloor % 60) + "m",
        hoursCeiling + "h" + toFive(minutesCeiling % 60) + "m",
      ].join("-");
    }

    // minutesFloor < 1hr ahead, hoursCeiling === 2h
    if (minutesFloor < 60 && hoursCeiling === "2h") {
      return [toFive(minutesFloor % 60) + "m", hoursCeiling].join("-");
    }

    // minutesFloor < 1hr ahead, hoursCeiling < 1 hr ahead
    if (minutesFloor < 60 && hoursCeiling === 0) {
      return [
        toFive(minutesFloor % 60) + "m",
        toFive(minutesCeiling) + "m",
      ].join("-");
    }
  }
}

function toFive(num) {
  return Math.round(num / 5) * 5;
}

const a = formatTime(t1, t2, t3);
const b = formatTime(t4, t5, t6);
const c = formatTime(t7, t8, t9);
const d = formatTime(t10, t11, t12);
const e = formatTime(t13, t14, t15);
const f = formatTime(t16, t17, t18);
const g = formatTime(t19, t20, t21);

console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);
console.log(f);
console.log(g);
