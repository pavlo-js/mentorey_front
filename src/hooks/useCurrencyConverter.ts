// useCurrencyConverter.ts
import { useState, useEffect } from "react";

const useCurrencyConverter = (from: string, to: string, amount: number) => {
  const [convertedAmount, setConvertedAmount] = useState<any>(null);

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const response = await fetch("/api/common/getCurrencyRates");
        const result = await response.json();

        const currencyRates = JSON.parse(result.data);
        const euroAmount =
          from === "EUR" ? amount : amount / currencyRates[from];
        const rawConvertedAmount = euroAmount * currencyRates[to];

        setConvertedAmount(parseFloat(rawConvertedAmount.toFixed(2)));
      } catch (error) {
        console.error("Error fetching currency rates:", error);
        setConvertedAmount(null);
      }
    };

    fetchCurrencyRates();
  }, [from, to, amount]);

  return convertedAmount;
};

export default useCurrencyConverter;
