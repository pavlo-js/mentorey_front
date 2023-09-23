import { Timezones, TimeCells } from '~/shared/data';

const MaxCellNum = TimeCells.length;

export function getTimezoneOffset(timezone: string) {
  const properTimezone = Timezones.filter((item) => item.utc.indexOf(timezone) >= 0);
  return properTimezone[0].offset;
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
