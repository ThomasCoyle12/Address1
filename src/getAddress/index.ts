import { DynamoDB, QueryCommand, QueryCommandInput  } from '@aws-sdk/client-dynamodb';
const dynamoDBClient = new DynamoDB({});
async function getAddress(event: any) {
  const { userId, suburb, postcode } = event.queryStringParameters || {};
  let filterExpressions = [];
  const expressionAttributeValues: any = {
    ':userId': { S: userId },
  };

  if (suburb) {
    filterExpressions.push('suburb = :suburb');
    expressionAttributeValues[':suburb'] = { S: suburb };
  }

  if (postcode) {
    filterExpressions.push('postcode = :postcode');
    expressionAttributeValues[':postcode'] = { S: postcode };
  }
  
//Potentially add conditional logic for userId as well to search for users with postcode/suburb

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
