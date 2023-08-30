import db from "~/database/db";

const api = `http://data.fixer.io/api/latest?access_key=${process.env.NEXT_PUBLIC_FIXER_IO_APIKEY}&base=USD`;

const query = "UPDATE currency_rates SET data = ? WHERE id = 0";

fetch(api)
  .then((res) => res.json())
  .then((data) => {
    db.execute(query, [JSON.stringify(data.rates)]);
  });
