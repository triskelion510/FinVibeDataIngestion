import * as cdk from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";

export class DataIngestionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stockDataBucket = new Bucket(this, "stock-data-bucket", {
      bucketName: "stock-data-finvibe-eu-central-1",
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const importHandler = new NodejsFunction(
      this,
      "import-stock-data-handler",
      {
        entry: join(__dirname, "./import-stock-data-handler.ts"),
        environment: {
          STOCK_API_URL: "https://www.alphavantage.co/query?",
          API_KEY: "WXBVV78T8J6CFJEV",
        },
        handler: "handler",
      }
    );

    stockDataBucket.grantPut(importHandler);

    /*
    const rule = new Rule(this, "import-stock-data-rule", {
      schedule: Schedule.cron({ hour: "3", minute: "0" }),
    });

    rule.addTarget(new targets.LambdaFunction(handler));
    */
  }
}
