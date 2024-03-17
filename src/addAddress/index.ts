import { DynamoDB } from '@aws-sdk/client-dynamodb';
const dynamoDBClient = new DynamoDB({});
async function addAddress(event: any) {
  const { userId, street, addressId, suburb, postcode } = JSON.parse(event.body);
  await dynamoDBClient.putItem({
    TableName: process.env.TABLE_NAME,
    Item: {
      userId: { S: userId },
      addressId: { S: addressId },
      street: { S: street },
      suburb: { S: suburb },
      postcode: { S: postcode }
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Address added successfully for ${userId}` }),
  };
}
export { addAddress as handler };
