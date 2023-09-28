import { DateTime } from 'luxon';
import axios from 'axios';
import { TimeCells } from '~/shared/data';

const TempWeeks: string[] = [
  '1997-06-09', // Monday
  '1997-06-10',
  '1997-06-11',
  '1997-06-12',
  '1997-06-13',
  '1997-06-14',
  '1997-06-15',
];

export function getWeekDates(year: number, weekNumber: number, timezone: string): string[] {
  const firstDayOfYear = DateTime.fromObject({ year, month: 1, day: 1 }).setZone(timezone);
  const startMondayOfYear = firstDayOfYear.set({ weekday: 1 });
  const startMondayOfTargetWeek = startMondayOfYear.plus({ weeks: weekNumber });

  const daysOfWeek: string[] = [];
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(startMondayOfTargetWeek.plus({ days: i }).toFormat('yyyy-MM-dd'));
  }

  return daysOfWeek;
}

async function getCoachBookings(coachID: number) {
  const { data: res } = await axios.post('/api/coach/get-coach-bookings', { coachID });
  return res.coach_bookings;
}

async function getBuyerBookings(buyerID: number) {
  const { data: res } = await axios.post('/api/common/get-buyer-bookings', { buyerID });
  return res.buery_bookings;
}

async function getAvailTimes(coachID: number) {
  const { data: res } = await axios.post('/api/coach/get-avail-times', { coachID });
  return { weeklyAvail: res.weekly_avail, overAvail: res.override_avail };
}

function convertWeeklyAvail(weeklyAvail: any[], fromZone: string, toZone: string, weekDates: string[]) {
  return weeklyAvail
    .map((slot) => {
      const fromTime = DateTime.fromISO(`${weekDates[slot.day_of_week]}T${TimeCells[slot.from_time]}`, {
        zone: fromZone,
      }).setZone(toZone);
      const toTime = DateTime.fromISO(`${weekDates[slot.day_of_week]}T${TimeCells[slot.to_time]}`, {
        zone: fromZone,
      }).setZone(toZone);

      if (fromTime.day != toTime.day) {
        return [
          {
            date: weekDates.includes(fromTime.toFormat('yyyy-MM-dd'))
              ? fromTime.toFormat('yyyy-MM-dd')
              : weekDates[weekDates.length - 1],
            from: TimeCells.indexOf(fromTime.toFormat('HH:mm')),
            to: 48,
            status: 'avail',
          },
          {
            date: weekDates.includes(toTime.toFormat('yyyy-MM-dd')) ? toTime.toFormat('yyyy-MM-dd') : weekDates[0],
            from: 0,
            to: TimeCells.indexOf(toTime.toFormat('HH:mm')),
            status: 'avail',
          },
        ];
      }

      return [
        {
          date: fromTime.toFormat('yyyy-MM-dd'),
          from: TimeCells.indexOf(fromTime.toFormat('HH:mm')),
          to: TimeCells.indexOf(toTime.toFormat('HH:mm')),
          status: 'avail',
        },
      ];
    })
    .flat();
}

function convertOverAvail(overAvail: any[], fromZone: string, toZone: string) {
  const rawOA = overAvail
    .map((slot) => {
      const fromTime = DateTime.fromISO(`${slot.date}T${TimeCells[slot.from_time]}`, { zone: fromZone }).setZone(
        toZone,
      );
      const toTime = DateTime.fromISO(`${slot.date}T${TimeCells[slot.to_time]}`, { zone: fromZone }).setZone(toZone);

      if (fromTime.day != toTime.day) {
        return [
          {
            date: fromTime.toFormat('yyyy-MM-dd'),
            from: TimeCells.indexOf(fromTime.toFormat('HH:mm')),
            to: 48,
          },
          {
            date: toTime.toFormat('yyyy-MM-dd'),
            from: 0,
            to: TimeCells.indexOf(toTime.toFormat('HH:mm')),
          },
        ];
      }

      return [
        {
          date: fromTime.toFormat('yyyy-MM-dd'),
          from: TimeCells.indexOf(fromTime.toFormat('HH:mm')),
          to: TimeCells.indexOf(toTime.toFormat('HH:mm')),
        },
      ];
    })
    .flat();
}

function processWaOa(wa: any[], oa: any[], weekDates: string[]) {
  const preWa = wa.map((slot) => {
    return {
      date: weekDates[slot.day_of_week],
      from: slot.from_time,
      to: slot.to_time,
    };
  });

  const mapWeekDates = new Map();
  weekDates.forEach((date) => {
    mapWeekDates.set(date, []);
  });

  preWa.forEach((item) => {
    const date = item.date;
    if (mapWeekDates.has(date)) {
      mapWeekDates.get(date).push({
        from: item.from,
        to: item.to,
      });
    }
  });

  // const mapOa = new Map<string, any[]>();

  // oa.forEach((oaSlot) => {
  //   const date = oaSlot.date;
  //   if (!mapOa.has(date)) {
  //     mapOa.set(date, []);
  //   }
  //   mapOa.get(date)?.push({
  //     date,
  //     from: oaSlot.from_time,
  //     to: oaSlot.to_time,
  //   });
  // });

  // console.log(mapOa);

  // return preWa
  //   .map((slot) => {
  //     const date = slot.date;
  //     if (mapOa.has(date)) {
  //       return mapOa.get(date);
  //     }
  //     return slot;
  //   })
  //   .flat();
}

function convertAvail(avail: Map<string, any[]>) {
  avail.forEach((value, key) => {});
}

function getOverStartEnd(date: string, coachZone: string, buyerZone: string) {
  const startTime = DateTime.fromISO(date, { zone: coachZone }).startOf('day').setZone(buyerZone);
  const endTime = DateTime.fromISO(`${date}T23:30`, { zone: coachZone }).setZone(buyerZone);

  const fromIndex = TimeCells.indexOf(startTime.toFormat('HH:mm'));
  const toIndex = TimeCells.indexOf(endTime.toFormat('HH:m')) + 1;

  if (startTime.day != endTime.day) {
    return [
      {
        date: startTime.toFormat('yyyy-MM-dd'),
        from: fromIndex,
        to: 49,
        status: 'blank',
      },
      {
        date: endTime.toFormat('yyyy-MM-dd'),
        from: 0,
        to: toIndex,
        status: 'blank',
      },
    ];
  }
  return [
    {
      date: startTime.toFormat('yyyy-MM-dd'),
      from: fromIndex,
      to: toIndex || 49,
      status: 'blank',
    },
  ];
}

export default async function getSchedule(buyer: any, coach: any, weekDates: string[]) {
  const availTimes = await getAvailTimes(coach.id);
  const weeklyAvail = availTimes.weeklyAvail;
  const overAvail = availTimes.overAvail;
  const coachBookings = await getCoachBookings(coach.id);
  const buyerBookings = await getBuyerBookings(buyer.id);
  const length = TimeCells.length;

  const availMap = new Map<string, any[]>();

  weekDates.forEach((item) => {
    console.log(item);
    availMap.set(
      item,
      Array.from({ length: 48 }, () => 'blank'),
    );
  });

  // weeklyAvail.forEach((slot: any) => {
  //   const date = weekDates[slot.day_of_week];
  //   avail.get(date)?.push({
  //     from: slot.from_time,
  //     to: slot.to_time,
  //     status: 'avail',
  //   });
  // });
  // ////////////////////////////////////////////////////
  // convert weekly avail times from coach's timezone to buyer's timezone
  const convertedWeeklyAvail = convertWeeklyAvail(weeklyAvail, coach.timezone, buyer.timezone, weekDates);

  convertedWeeklyAvail.forEach((slot) => {
    availMap.get(slot.date)?.fill(slot.status, slot.from, slot.to);
  });

  const overMap = new Map<string, any[]>();
  overAvail.forEach((slot: any) => {
    if (!overMap.has(slot.date)) {
      overMap.set(slot.date, []);
    }
    overMap.get(slot.date)?.push({ from: slot.from_time, to: slot.to_time, status: 'avail' });
  });
  const overDates = Array.from(overMap.keys());

  console.log(overDates);

  // // determine the start time and end time based on buyer's timezone
  const overStartEnds = overDates.map((date) => getOverStartEnd(date, coach.timezone, buyer.timezone)).flat();
  overStartEnds.forEach((slot) => {
    availMap.get(slot.date)?.fill(slot.status, slot.from, slot.to);
  });

  // // Update avail
  overMap.forEach((value, key) => {
    if (availMap.has(key)) {
      value.map((slot) => {
        availMap.get(key)?.fill(slot.status, slot.from, slot.to);
      });
    }
  });

  const schedule: any[] = [];
  availMap.forEach((value, key) => {
    schedule.push({ date: key, timeSlots: value });
  });

  return schedule;
  ///////////////////////////////////////////////////////
  // // Convert avail into buyer's timezone
  // const convertedAvail = convertAvail(avail);

  // coachBookings.map((booking: any) => {
  //   const fromTime = DateTime.fromISO(booking.start_time).toUTC().setZone(buyer.timezone);
  //   const endTime = DateTime.fromISO(booking.end_time).toUTC().setZone(buyer.timezone);

  //   if (fromTime.toFormat('yyyy-MM-dd') != endTime.toFormat('yyyy-MM-dd')) {
  //     return [
  //       {
  //         date: fromTime.toFormat('yyyy-MM-dd'),
  //         from: TimeCells.indexOf(fromTime.toFormat('HH:mm')),
  //         to: 48,
  //         status: buyer.id === booking.buyer_id ? 'booked_by_me' : 'booked_by_other',
  //       },
  //       {
  //         date: endTime.toFormat('yyyy-MM-dd'),
  //         from: 0,
  //         to: TimeCells.indexOf(endTime.toFormat('HH:mm')),
  //         status: buyer.id === booking.buyer_id ? 'booked_by_me' : 'booked_by_other',
  //       },
  //     ];
  //   }
  //   return [
  //     {
  //       date: fromTime.toFormat('yyyy-MM-dd'),
  //       from: TimeCells.indexOf(fromTime.toFormat('HH:mm')),
  //       to: TimeCells.indexOf(endTime.toFormat('HH:mm')),
  //       status: buyer.id === booking.buyer_id ? 'booked_by_me' : 'booked_by_other',
  //     },
  //   ];
  // });
}
