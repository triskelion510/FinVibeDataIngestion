import axios from "axios";
import { ImportService } from "./import-service";
import { getCurrentDate } from "./helpers";

interface Dependencies {
  importService: ImportService;
}

export const handlerBuilder = (dependencies: Dependencies) => async () => {
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

  const response = await axios.get(
    `${process.env.STOCK_API_URL}function=${type}&symbol=${company}&interval=${interval}&apikey=${process.env.API_KEY}`
  );

  if (!response) {
    throw new Error("no data for request");
  }

  console.log(`data received: ${JSON.stringify(response.data)}`);

  const fileName = `${company}-${type}-data-${getCurrentDate()}.json`;

  await importService.persistStockData(fileName, JSON.stringify(response.data));
};

export const main = handlerBuilder({ importService: new ImportService() });
