import * as path from 'path';

import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';

export class LambdaRetrieveSecretsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const serviceASecretKeyParameter =
    StringParameter.fromSecureStringParameterAttributes(
      this,
      "ServiceASecretKey",
      { parameterName: "/dev/service-a/secret-key" }
    );

    const secretsExampleLambda = new NodejsFunction(this, 'SecretsExampleLambda', {
      entry: path.join(__dirname, 'lambda', 'index.ts'),
      runtime: Runtime.NODEJS_16_X,
      environment: {
        SERVICE_A_SECRET_KEY_PARAMETER_NAME: serviceASecretKeyParameter.parameterName,
      }
    });

    serviceASecretKeyParameter.grantRead(secretsExampleLambda);

    // just to properly clean up the example environment
    new LogGroup(this, 'SecretsExampleLambdaLogGroup', {
      logGroupName: `/aws/lambda/${secretsExampleLambda.functionName}`,
      retention: RetentionDays.ONE_DAY,
      removalPolicy: RemovalPolicy.DESTROY,
    })
  }
}
