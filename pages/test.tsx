import { useEffect, useState } from "react";
import currencyConverter from "~/utils/currencyConverter";
export default function TestPage() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    currencyConverter("EUR", "USD", 27).then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
}
