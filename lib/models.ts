import { z } from "zod";

const DailyStockDataSchema = z.object({
  "1. open": z.string(),
  "2. high": z.string(),
  "3. low": z.string(),
  "4. close": z.string(),
  "5. volume": z.string(),
});

export const AlphavantageResponse = z.object({
  "Meta Data": z.object({
    "1. Information": z.string(),
    "2. Symbol": z.string(),
    "3. Last Refreshed": z.string(),
    "4. Output Size": z.string(),
    "5. Time Zone": z.string(),
  }),
  "Time Series (Daily)": z.record(z.string(), DailyStockDataSchema),
});
