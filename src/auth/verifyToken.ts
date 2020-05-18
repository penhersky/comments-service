import database from '../common/database';

const tokenCollection = process.env.TOKEN_TABLE;

const generatePolicy = ({ allow }) => {
  return {
    principalId: 'token',
    policyDocument: {
      Version: '2012-10-17',
      Statement: {
        Action: 'execute-api:Invoke',
        Effect: allow ? 'Allow' : 'Deny',
        Resource: '*',
      },
    },
  };
};

// eslint-disable-next-line import/prefer-default-export
export const handler = async (event: any): Promise<any> => {
  const tokenID =
    event.headers &&
    (event.headers['X-Amz-Security-Token'] ||
      event.headers['x-amz-security-token']);

  if (!tokenID) {
    return generatePolicy({ allow: false });
  }

  try {
    const client = await database.connect();

    const data = await database.get(client, tokenCollection, tokenID);

    if (!data) {
      return generatePolicy({ allow: false });
    }

    if (data.expiryDate && data.expiryDate < Date.now()) {
      return generatePolicy({ allow: false });
    }

    return generatePolicy({ allow: true });
  } catch (error) {
    console.log('error ', error);
    return generatePolicy({ allow: false });
  }
};
