// lower has passed, upper in future
const t1 = new Date("2023-03-01T10:00:00.000Z"); // 10:00am
const t2 = new Date("2023-03-01T11:30:00.000Z"); // 11:30am
const t3 = new Date("2023-03-01T14:30:00.000Z"); // 2:30pm

// lower has passed, upper has passed
const t4 = new Date("2023-03-01T10:00:00.000Z"); // 10:00am
const t5 = new Date("2023-03-01T11:30:00.000Z"); // 11:30am
const t6 = new Date("2023-03-01T11:00:00.000Z"); // 11:00am

// lower in future, upper in future
const t7 = new Date("2023-03-01T14:01:00.000Z"); // 2:01pm
const t8 = new Date("2023-03-01T14:23:00.000Z"); // 2:23pm
const t9 = new Date("2023-03-01T14:42:00.000Z"); // 2:42pm

// lower in future, upper in future
const t10 = new Date("2023-03-01T11:45:00.000Z"); // 11:45am
const t11 = new Date("2023-03-01T11:33:00.000Z"); // 11:33am
const t12 = new Date("2023-03-01T14:30:00.000Z"); // 2:30pm

// lower in future, upper in future
const t13 = new Date("2023-03-01T11:45:00.000Z"); // 11:45am
const t14 = new Date("2023-03-01T10:33:00.000Z"); // 10:33am
const t15 = new Date("2023-03-01T14:30:00.000Z"); // 2:30pm

// lower in future, upper in future
const t16 = new Date("2023-03-01T11:45:00.000Z"); // 11:45am
const t17 = new Date("2023-03-01T10:33:00.000Z"); // 10:33am
const t18 = new Date("2023-03-01T12:13:00.000Z"); // 12:13pm

// lower in future, upper in future
const t19 = new Date("2023-03-01T10:45:00.000Z"); // 10:45am
const t20 = new Date("2023-03-01T10:33:00.000Z"); // 10:33am
const t21 = new Date("2023-03-01T10:55:00.000Z"); // 10:55am

// lower in future, upper in future
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

function formatTime(lower, now, upper) {
  // get time differences for lower and upper bounds
  const timeToLower = lower - now;
  const timeToUpper = upper - now;

  // lower has passed, upper has passed, or all equal
  if (timeToLower <= 0 && timeToUpper <= 0) {
    return "as soon as possible";
  }

  // lower has passed, upper in future
  if (timeToLower <= 0 && timeToUpper > 0) {
    const minutes = timeToUpper / 1000 / 60;
    return fmtMinutes(minutes);
  }

  // lower in future, upper in future
  if (timeToLower > 0 && timeToUpper > 0) {
    const minuteslower = timeToLower / 1000 / 60;
    const minutesupper = timeToUpper / 1000 / 60;

    // Enumerate through all possible combinations:

    // minuteslower > 2h return 2h
    if (minuteslower >= 120) return "2h";

    // minuteslower 1hr+ ahead
    if (minuteslower >= 60 && minutesupper >= 120) {
      return [fmtMinutes(minuteslower), "2h"].join("-");
    }

    // minuteslower 1hr+ ahead, minutesupper 1hr+ ahead
    if (minuteslower >= 60 && minutesupper >= 60) {
      return [fmtMinutes(minuteslower), fmtMinutes(minutesupper)].join("-");
    }

    // minuteslower < 1hr ahead, hoursupper === 2h
    if (minuteslower < 60 && minutesupper > 120) {
      return [fmtMinutes(minuteslower), fmtMinutes(minutesupper)].join("-");
    }

    // minuteslower < 1hr ahead, hoursupper < 1 hr ahead
    if (minuteslower <= 60 && minutesupper <= 60) {
      const lowerStr = fmtMinutes(minuteslower);
      // remove first 'm'
      return [
        lowerStr.slice(0, lowerStr.length - 1),
        fmtMinutes(minutesupper),
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
