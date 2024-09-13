import { S3 } from "@aws-sdk/client-s3";

interface Dependencies {
  s3?: S3;
}

export class ImportService {
  private s3: S3;

  constructor(dependencies?: Dependencies) {
    this.s3 = dependencies?.s3 ?? new S3({});
  }

  async persistStockData(fileName: string, data: string) {
    await this.s3.putObject({
      Bucket: "stock-data-finvibe-eu-central-1",
      Key: fileName,
      Body: data,
    });
  }
}
