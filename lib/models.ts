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

// function
const type = z.enum([
  "HT_PHASOR",
  "HT_DCPHASE",
  "HT_SINE",
  "BBANDS",
  "AROON",
  "CCI",
  "RSI",
  "STOCH",
  "VWAP", // Premium API
  "EMA", // Moving average
  "NONFARM_PAYROLL", // all mpthly workers - US Data
  "UNEMPLOYMENT", // US Data
  "INFLATION", // US Data
  "REAL_GDP", // US Data
  "COPPER",
  "ALUMINUM",
  "DIGITAL_CURRENCY_MONTHLY", // => symbol e.g (BTC, EUR, USD)
  "DIGITAL_CURRENCY_WEEKLY", // => symbol e.g (BTC, EUR, USD)
  "DIGITAL_CURRENCY_DAILY", // => symbol e.g (BTC, EUR, USD)
  "CRYPTO_INTRADAY", // PREMIUM API
  "CURRENCY_EXCHANGE_RATE", // => symbol e.g (BTC, EUR, USD)
  "IPO_CALENDAR", // IPOs in the next 3 months
  "EARNINGS_CALENDAR", // expected earnings next 3,6,12 months
  "CASH_FLOW", // companies cash flow
  "INCOME_STATEMENT",
  "INSIDER_TRANSACTIONS",
  "TOP_GAINERS_LOSERS", // most actively traded
  "HISTORICAL_OPTIONS", // historical options
  "TIME_SERIES_INTRADAY",
]);
