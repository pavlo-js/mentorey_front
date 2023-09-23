// Function to format a number in thousands (K) or millions (M) format depending on its value
export const toUiAmount = (amount: number) => {
  if (!amount) return 0;

  let value;

  if (amount >= 1000000000) {
    const formattedNumber = (amount / 1000000000).toFixed(1);
    if (Number(formattedNumber) === parseInt(formattedNumber)) {
      value = parseInt(formattedNumber) + 'B';
    } else {
      value = formattedNumber + 'B';
    }
  } else if (amount >= 1000000) {
    const formattedNumber = (amount / 1000000).toFixed(1);
    if (Number(formattedNumber) === parseInt(formattedNumber)) {
      value = parseInt(formattedNumber) + 'M';
    } else {
      value = formattedNumber + 'M';
    }
  } else if (amount >= 1000) {
    const formattedNumber = (amount / 1000).toFixed(1);
    if (Number(formattedNumber) === parseInt(formattedNumber)) {
      value = parseInt(formattedNumber) + 'K';
    } else {
      value = formattedNumber + 'K';
    }
  } else {
    value = amount.toFixed(0);
  }

  return value;
};

export function getLocalTimezone() {
  const date = new Date();

  // Get the timezone offset in minutes
  const timezoneOffsetInMinutes = date.getTimezoneOffset();

  // Convert the offset to hours and calculate the sign (+ or -)
  const timezoneOffsetHours = Math.abs(timezoneOffsetInMinutes / 60);
  const timezoneSign = timezoneOffsetInMinutes < 0 ? '+' : '-';

  // Format the timezone string as "GMT±hh:mm"
  const timezoneString = `GMT${timezoneSign}${String(timezoneOffsetHours).padStart(2, '0')}:${String(
    Math.abs(timezoneOffsetInMinutes) % 60,
  ).padStart(2, '0')}`;

  return timezoneString;
}

export function getFileExtension(fileName: string) {
  const parts = fileName.split('.');
  if (parts.length > 1) {
    return parts.pop(); // Get the last element after splitting
  } else {
    return ''; // No file extension found
  }
}

export function generateVerificationCode() {
  const codeLength = 6;
  let code = '';

  for (let i = 0; i < codeLength; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    code += randomDigit.toString();
  }

  return code;
}

export function getFullS3Uri(objectKey: string) {
  return `https://mentorey.s3.eu-central-1.amazonaws.com/${objectKey}`;
}

export function validatePhoneNumber(phoneNumber: string | undefined) {
  if (phoneNumber) {
    const cleanedPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
    const isValid = /^\+\d{1,}\d*$/.test(cleanedPhoneNumber);
    return isValid;
  }
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0'); // Months are 0-based
  let day = date.getDate().toString().padStart(2, '0');
  return year + '-' + month + '-' + day;
}

// Function to get all days of a specific week in a year
export function getWeekDays(year: any, weekNumber: any) {
  const firstDayOfYear = new Date(year, 0, 1); // January 1st of the year
  const firstDayOfWeek = new Date(year, 0, 1 + (weekNumber - 1) * 7); // First day of the specified week

  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    weekDays.push(day);
  }

  return weekDays;
}

export function getWeekNumber(date: Date): number {
  const firstDayOfYear: Date = new Date(date.getFullYear(), 0, 1);
  const daysOffset: number = firstDayOfYear.getDay() === 0 ? -6 : 1; // Adjust for different week start days
  const firstMondayOfYear: Date = new Date(date.getFullYear(), 0, 1 + ((8 - firstDayOfYear.getDay()) % 7) + daysOffset);

  const diffInDays: number = (date.getTime() - firstMondayOfYear.getTime()) / (24 * 60 * 60 * 1000);
  const weekNumber: number = 1 + Math.floor(diffInDays / 7);

  return weekNumber;
}
