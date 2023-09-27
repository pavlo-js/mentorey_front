import { DateTime } from 'luxon';

export default function TestPage() {
  const localTime = DateTime.now();

  console.log(DateTime.fromFormat('03:00', 'HH:mm', { zone: localTime.zoneName! }));

  return <div>this is test page</div>;
}
