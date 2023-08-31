// Note that this currency data is based on EURO
const api = "/api/common/getCurrencyRates";
export default async function currencyConverter(
  from: string,
  to: string,
  amount: number
) {
  const response = await fetch(api);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  const { data } = await response.json();
  const currencyRates = JSON.parse(data);

  const euroAmount = from === "EUR" ? amount : amount / currencyRates[from];
  const rawConvertedAmount = euroAmount * currencyRates[to];
  const convertedAmount = parseFloat(rawConvertedAmount.toFixed(2));

  return convertedAmount;
}
