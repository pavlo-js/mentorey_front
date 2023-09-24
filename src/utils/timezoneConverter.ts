import { Timezones, TimeCells } from '~/shared/data';

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
  const temp = new Date(`1970-01-01T${utcTime}:00Z`);
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
