import { Stack, StackProps, RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import { Table, AttributeType, BillingMode } from 'aws-cdk-lib/aws-dynamodb';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { RestApi, LambdaIntegration, UsagePlan, ApiKey } from 'aws-cdk-lib/aws-apigateway';

export class MyApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const userAddressesTable = new Table(this, 'UserAddresses', {
      partitionKey: { name: 'userId', type: AttributeType.STRING },
      sortKey: { name: 'addressId', type: AttributeType.STRING },
      tableName: 'UserAddresses',
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const addAddressFunction = new Function(this, 'AddAddressFunction', {
      runtime: Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, '../src/addAddress')),
      environment: {
        TABLE_NAME: userAddressesTable.tableName,
      },
    });

    const getAddressFunction = new Function(this, 'GetAddressFunction', {
      runtime: Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, '../src/getAddress')),
      environment: {
        TABLE_NAME: userAddressesTable.tableName,
      },
    });

    userAddressesTable.grantReadWriteData(addAddressFunction);
    userAddressesTable.grantReadData(getAddressFunction);

    const api = new RestApi(this, 'UserAddressApi', {
      restApiName: 'User Address Service',
    });

    const addresses = api.root.addResource('addresses');
    addresses.addMethod('POST', new LambdaIntegration(addAddressFunction), {
      apiKeyRequired: true, 
    });

    const userAddresses = addresses.addResource('{userId}');
    userAddresses.addMethod('GET', new LambdaIntegration(getAddressFunction), {
      apiKeyRequired: true, 
    });

    const apiKey = new ApiKey(this, 'ApiKey', {
      apiKeyName: 'UserAddressApiKey',
    });

    const plan = new UsagePlan(this, 'UsagePlan', {
      name: 'Basic',
    });

    plan.addApiKey(apiKey);

    new CfnOutput(this, 'ApiKeyOutput', {
      value: apiKey.keyId,
    });
  }
}
