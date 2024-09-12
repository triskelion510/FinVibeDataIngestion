import axios from "axios";
import { ImportService } from "./import-service";

interface Dependencies {
  importService: ImportService;
}

export const handlerBuilder = async (dependencies: Dependencies) => {
  const { importService } = dependencies;

  const data = await axios.get(
    `${process.env.STOCK_API_URL}${process.env.API_KEY}`
  );

  // put into csv
  let csvData = "";

  // save 75% as training data the other 25% as test data in bucket
  const fileName = `${new Date()}`;

  await importService.persistStockData(fileName, csvData);
};

export const handler = handlerBuilder({ importService: new ImportService() });
