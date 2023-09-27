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
  const coachStartTime = DateTime.fromISO(date, { zone: coachZone }).startOf('day').setZone(buyerZone);
  const coachEndTime = DateTime.fromISO(date, { zone: coachZone }).endOf('day').setZone(buyerZone);

  const fromIndex = TimeCells.indexOf(coachStartTime.toFormat('HH:mm'));
  const toIndex = TimeCells.indexOf(coachEndTime.toFormat('HH:m'));
  return [
    {
      date: date,
      from: fromIndex,
      end: toIndex || 49,
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
    availMap.set(
      item,
      Array.from({ length: 49 }, () => 'blank'),
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

  // convert weekly avail times from coach's timezone to buyer's timezone
  const convertedWeeklyAvail = convertWeeklyAvail(weeklyAvail, coach.timezone, buyer.timezone, weekDates);

  convertedWeeklyAvail.forEach((slot) => {
    availMap.get(slot.date)?.fill(slot.status, slot.from, slot.to);
  });

  console.log(getOverStartEnd('2023-06-13', coach.timezone, buyer.timezone));

  // const overMap = new Map<string, any[]>();
  // overAvail.forEach((slot: any) => {
  //   if (!overMap.has(slot.date)) {
  //     overMap.set(slot.date, []);
  //   }
  //   overMap.get(slot.date)?.push({ from: slot.from_time, to: slot.to_time, status: 'avail' });
  // });
  // // Update avail
  // overMap.forEach((value, key) => {
  //   if (avail.has(key)) {
  //     avail.set(key, value);
  //   }
  // });

  // // Convert avail into buyer's timezone
  // const convertedAvail = convertAvail(avail);

  console.log(DateTime.fromISO('2023-09-15T24:00:00'));

  ('2023-09-16T00:00:00.000+09:00');

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
