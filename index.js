// floor has passed, ceiling in future
const t1 = new Date("2023-03-01T10:00:00.000Z"); // 10:00am
const t2 = new Date("2023-03-01T11:30:00.000Z"); // 11:30am
const t3 = new Date("2023-03-01T14:30:00.000Z"); // 2:30pm

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

// floor in future, ceiling in future
const t22 = new Date("2023-03-01T10:14:00.000Z"); // 10:14am
const t23 = new Date("2023-03-01T10:33:00.000Z"); // 10:33am
const t24 = new Date("2023-03-01T11:55:00.000Z"); // 11:55am

function toFives(num) {
  return Math.round(num / 5) * 5;
}

function fmtMinutes(minutes) {
  if (minutes <= 0) return "";

  if (minutes > 0 && minutes < 60) {
    return `${toFives(minutes)}m`;
  }

  if (minutes >= 60 && minutes < 120) {
    return `1h${toFives(minutes % 60)}m`;
  }

  return "2h";
}

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
    return fmtMinutes(minutes);
  }

  // floor in future, ceiling in future
  if (timeToFloor > 0 && timeToCeiling > 0) {
    const minutesFloor = timeToFloor / 1000 / 60;
    const minutesCeiling = timeToCeiling / 1000 / 60;

    // Enumerate through all possible combinations:

    // minutesFloor > 2h return 2h
    if (minutesFloor >= 120) return "2h";

    // minutesFloor 1hr+ ahead
    if (minutesFloor >= 60 && minutesCeiling >= 120) {
      return [fmtMinutes(minutesFloor), "2h"].join("-");
    }

    // minutesFloor 1hr+ ahead, minutesCeiling 1hr+ ahead
    if (minutesFloor >= 60 && minutesCeiling >= 60) {
      return [fmtMinutes(minutesFloor), fmtMinutes(minutesCeiling)].join("-");
    }

    // minutesFloor < 1hr ahead, hoursCeiling === 2h
    if (minutesFloor < 60 && minutesCeiling > 120) {
      return [fmtMinutes(minutesFloor), fmtMinutes(minutesCeiling)].join("-");
    }

    // minutesFloor < 1hr ahead, hoursCeiling < 1 hr ahead
    if (minutesFloor <= 60 && minutesCeiling <= 60) {
      const lowerStr = fmtMinutes(minutesFloor);
      // remove first 'm'
      return [
        lowerStr.slice(0, lowerStr.length - 1),
        fmtMinutes(minutesCeiling),
      ].join("-");
    }
  }
}

const a = formatTime(t1, t2, t3);
const b = formatTime(t4, t5, t6);
const c = formatTime(t7, t8, t9);
const d = formatTime(t10, t11, t12);
const e = formatTime(t13, t14, t15);
const f = formatTime(t16, t17, t18);
const g = formatTime(t19, t20, t21);
const h = formatTime(t22, t23, t24);

console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);
console.log(f);
console.log(g);
console.log(h);
