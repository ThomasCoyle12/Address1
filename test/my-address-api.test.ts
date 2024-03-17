import '@aws-cdk/assert/jest';
import { App } from 'aws-cdk-lib';
import { MyApiStack } from '../lib/my-address-api-stack';

test('DynamoDB Table Created', () => {
  const app = new App();
  const stack = new MyApiStack(app, 'MyTestStack');
  expect(stack).toHaveResource('AWS::DynamoDB::Table', {
    BillingMode: 'PAY_PER_REQUEST',
  });
});
