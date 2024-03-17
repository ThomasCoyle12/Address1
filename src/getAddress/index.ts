import { DynamoDB } from '@aws-sdk/client-dynamodb';

const dynamoDBClient = new DynamoDB({});

async function getAddress(event: any) {
  const { userId, suburb, postcode } = event.queryStringParameters || {};
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': { S: userId },
    },
  };

  const { Items } = await dynamoDBClient.query(params);

  return {
    statusCode: 200,
    body: JSON.stringify({ addresses: Items }),
  };
}

export { getAddress as handler };
