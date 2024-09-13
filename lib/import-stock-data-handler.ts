import axios from "axios";
import { ImportService } from "./import-service";
import { getCurrentDate } from "./helpers";

interface Dependencies {
  importService: ImportService;
}

export const handlerBuilder = async (dependencies: Dependencies) => {
  const { importService } = dependencies;

  if (!process.env.STOCK_API_URL) {
    throw new Error('Env variable "STOCK_API_URL" not set');
  }

  if (!process.env.API_KEY) {
    throw new Error('Env variable "API_KEY" not set');
  }

  const company = process.env.COMPANY;
  const type = process.env.FUNCTION;
  const interval = process.env.INTERVAL;

  if (!company) {
    throw new Error('Env variable "COMPANY" not set');
  }

  if (!type) {
    throw new Error('Env variable "TYPE" not set');
  }

  if (!interval) {
    throw new Error('Env variable "INTERVAL" not set');
  }

  const data = await axios.get(
    `${process.env.STOCK_API_URL}function=${type}&symbol=${company}&interval=${interval}&apikey=${process.env.API_KEY}`
  );

  if (!data) {
    throw new Error("no data for request");
  }

  const fileName = `${company}-historical-stock-data-${getCurrentDate()}.csv`;

  await importService.persistStockData(fileName, JSON.stringify(data));
};

export const handler = handlerBuilder({ importService: new ImportService() });
