import { Stack, aws_dynamodb as dynamodb, aws_lambda as lambda, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';

export class MyApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const userAddressesTable = new dynamodb.Table(this, 'UserAddresses', {
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'addressId', type: dynamodb.AttributeType.STRING },
      tableName: 'UserAddresses',
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const AddAddressFunction = new lambda.Function(this, 'AddAddressFunction', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/addAddress')),
      environment: {
        TABLE_NAME: userAddressesTable.tableName,
      },
    });

    const GetAddressFunction = new lambda.Function(this, 'GetAddressFunction', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/getAddress')),
      environment: {
        TABLE_NAME: userAddressesTable.tableName,
      },
    });

    userAddressesTable.grantReadWriteData(AddAddressFunction);
    userAddressesTable.grantReadData(GetAddressFunction);
  }
}
