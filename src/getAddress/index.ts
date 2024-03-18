import { DynamoDB, QueryCommand, QueryCommandInput } from '@aws-sdk/client-dynamodb';

const dynamoDBClient = new DynamoDB();

async function getAddress(event: any) {
  const { userId, suburb, postcode } = event.queryStringParameters || {};
  const expressionAttributeValues: any = {
    ':userId': { S: userId },
  };

  const filterExpressions = [];

  switch (true) {
    case suburb && postcode:
      filterExpressions.push('suburb = :suburb AND postcode = :postcode');
      expressionAttributeValues[':suburb'] = { S: suburb };
      expressionAttributeValues[':postcode'] = { S: postcode };
      break;
    case suburb:
      filterExpressions.push('suburb = :suburb');
      expressionAttributeValues[':suburb'] = { S: suburb };
      break;
    case postcode:
      filterExpressions.push('postcode = :postcode');
      expressionAttributeValues[':postcode'] = { S: postcode };
      break;
    default:
      break;
  }

  const params: QueryCommandInput = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: expressionAttributeValues,
  };

  if (filterExpressions.length > 0) {
    params.FilterExpression = filterExpressions.join(' AND ');
  }

  const command = new QueryCommand(params);
  const { Items } = await dynamoDBClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({ addresses: Items }),
  };
}


export { getAddress as handler };