import 'source-map-support/register';

// eslint-disable-next-line import/prefer-default-export
export const handler = async (event: any) => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: 'TypeScrip serverless project',
      input: event,
    },
    null,
    2,
  ),
});
