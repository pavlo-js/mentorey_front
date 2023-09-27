import { Timezones, TimeCells } from '~/shared/data';
import { DateTime } from 'luxon';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

const MaxCellNum = TimeCells.length;

export function getTimezoneOffset(timezone: string) {
  const properTimezone = Timezones.filter((item) => item.utc.indexOf(timezone) >= 0);
  return properTimezone[0].offset;
}

export function localToUtc(time: number, timezone: string) {
  const offset = getTimezoneOffset(timezone);
  const localTime = TimeCells[time];
  const temp = new Date(`1970-01-01T${localTime}:00Z`);
  temp.setHours(temp.getHours() - offset);

  const utcTime = temp.toISOString().substr(11, 5);

  return TimeCells.indexOf(utcTime);
}

export function UtcToLocal(time: number, timezone: string) {
  const offset = getTimezoneOffset(timezone);
  const utcTime = TimeCells[time];
  const temp = new Date(`1980-01-01T${utcTime}:00Z`);
  temp.setHours(temp.getHours() + offset);

  const localTime = temp.toISOString().substr(11, 5);

  return TimeCells.indexOf(localTime);
}

export function convertToUTC(localTime: number, timezone: string) {
  const properTimezone = Timezones.filter((item) => item.utc.indexOf(timezone) >= 0);
  const offset = properTimezone[0].offset;

  if (offset > 0) {
    const utcTime = localTime - offset * 2;
    console.log('++++++++', timezone, offset, utcTime);
    if (utcTime < 0) {
      return MaxCellNum - Math.abs(utcTime);
    }
    return utcTime;
  } else if (offset < 0) {
    const utcTime = localTime + offset * 2;
    console.log('--------', timezone, offset, utcTime);
    if (utcTime > MaxCellNum) {
      return utcTime - MaxCellNum;
    }
    return utcTime;
  }

  return localTime;
}

export function convertToLoaclTimezone(utcTime: number, timezone: string) {
  const properTimezone = Timezones.filter((item) => item.utc.indexOf(timezone) >= 0);
  const offset = properTimezone[0].offset;

  if (offset > 0) {
    const localTime = utcTime + offset * 2;
    if (localTime > MaxCellNum) {
      return localTime - MaxCellNum;
    }
    return localTime;
  } else if (offset < 0) {
    const localTime = utcTime - offset * 2;
    if (localTime < 0) {
      return MaxCellNum - Math.abs(localTime);
    }
    return localTime;
  }

  return utcTime;
}

export function getDaysOfWeek(year: number, weekNumber: number): Date[] {
  const days: Date[] = [];

  // Start from January 1st of the given year.
  const start = new Date(year, 0, 1);

  // Set the date to the Monday of the desired week.
  // Here, we consider the first week to have at least 4 days.
  // Therefore, if January 1st is a Thursday, Friday, Saturday, or Sunday, it is part of the last week of the previous year.
  const daysToMonday = start.getDay() === 0 ? 6 : start.getDay() - 1;
  const daysToDesiredMonday = (weekNumber - 1) * 7;
  start.setDate(start.getDate() - daysToMonday + daysToDesiredMonday);

  for (let i = 0; i < 7; i++) {
    days.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }

  return days;
}

// Test
const year = 2023;
const week = 10;
const days = getDaysOfWeek(year, week);
for (const day of days) {
  console.log(day.toISOString().split('T')[0]);
}

export function getWeekNumber(date: Date): number {
  // Clone the input to prevent modifying the original date.
  const tempDate = new Date(date.getTime());

  // Start from January 1st of the year of the given date.
  const startOfYear = new Date(tempDate.getFullYear(), 0, 1);

  // Calculate the difference between the given date and January 1st.
  const daysFromStart = Math.floor((tempDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));

  // Calculate which day of the week January 1st is.
  // If January 1st is Thursday or earlier, we count it as part of the first week of the year.
  // If January 1st is Friday, Saturday, or Sunday, it belongs to the last week of the previous year.
  const startDay = startOfYear.getDay();
  const daysToFirstThursday = startDay <= 4 ? 4 - startDay : 4 + 7 - startDay;

  // Calculate the week number.
  const weekNumber = Math.ceil((daysFromStart - daysToFirstThursday + 1) / 7) + 1;

  return weekNumber;
}

export function convertTimezone(sourceTime: Date, sourceTimezone: string, targetTimezone: string): Date {
  // Convert the source time from the source timezone to UTC
  const utcTime = zonedTimeToUtc(sourceTime, sourceTimezone);

  // Convert the UTC time to the target timezone
  const targetTime = utcToZonedTime(utcTime, targetTimezone);

  return targetTime;
}

function weeklyAvailConverter(
  sourceTimezone: string,
  targetTimezone: string,
  sourceWeek: string[],
  targetWeek: string,
  weeklyTimeSlot: any,
) {
  const sourceFromTime = DateTime.fromISO(
    `${sourceWeek[weeklyTimeSlot.day_of_week]}T${TimeCells[weeklyTimeSlot.from_time]}:00Z`,
    { zone: sourceTimezone },
  );
  const sourceToTime = DateTime.fromISO(
    `${sourceWeek[weeklyTimeSlot.day_of_week]}T${TimeCells[weeklyTimeSlot.to_time]}:00`,
    { zone: sourceTimezone },
  );

  const targetFromTime = sourceFromTime.setZone(targetTimezone);
  const targetToTime = sourceToTime.setZone(targetTimezone);
}
