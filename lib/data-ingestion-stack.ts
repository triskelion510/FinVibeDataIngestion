import * as cdk from "aws-cdk-lib";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as targets from "aws-cdk-lib/aws-events-targets";
import { join } from "path";

export class DataIngestionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new NodejsFunction(this, "import-stock-data-handler", {
      entry: join(__dirname, "import-stock-data-handler.ts"),
      environment: {
        STOCK_API_URL:
          "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=",
        API_KEY: "WXBVV78T8J6CFJEV",
      },
    });

    const rule = new Rule(this, "import-stock-data-rule", {
      schedule: Schedule.cron({ hour: "3", minute: "0" }),
    });

    rule.addTarget(new targets.LambdaFunction(handler));
  }
}
