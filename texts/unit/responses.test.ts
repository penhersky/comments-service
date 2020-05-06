import res from '../../src/common/responses';

describe('$ Testing responses fom end points', () => {
  it('texting code 200', () => {
    const message = 'everything is good!';
    const result = res.C200({ message });
    expect(typeof result).toEqual('object');
    expect(result.headers['Access-Control-Allow-Origin']).toEqual('*');
    expect(result.headers['Content-Type']).toEqual('application/json');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body).toEqual('string');
  });
  it('texting code 201', () => {
    const message = 'data saved!';
    const result = res.C201({ message });
    expect(typeof result).toEqual('object');
    expect(result.headers['Access-Control-Allow-Origin']).toEqual('*');
    expect(result.headers['Content-Type']).toEqual('application/json');
    expect(result.statusCode).toEqual(201);
    expect(typeof result.body).toEqual('string');
  });
  it('texting code 204', () => {
    const message = 'No content!';
    const result = res.C204({ message });
    expect(typeof result).toEqual('object');
    expect(result.headers['Access-Control-Allow-Origin']).toEqual('*');
    expect(result.headers['Content-Type']).toEqual('application/json');
    expect(result.statusCode).toEqual(204);
    expect(typeof result.body).toEqual('string');
  });
  it('texting code 400', () => {
    const error = 'Bad request';
    const result = res.C400({ error });
    expect(typeof result).toEqual('object');
    expect(result.headers['Access-Control-Allow-Origin']).toEqual('*');
    expect(result.headers['Content-Type']).toEqual('application/json');
    expect(result.statusCode).toEqual(400);
    expect(typeof result.body).toEqual('string');
  });
  it('texting code 404', () => {
    const error = 'Not found!';
    const result = res.C404({ error });
    expect(typeof result).toEqual('object');
    expect(result.headers['Access-Control-Allow-Origin']).toEqual('*');
    expect(result.headers['Content-Type']).toEqual('application/json');
    expect(result.statusCode).toEqual(404);
    expect(typeof result.body).toEqual('string');
  });
});
