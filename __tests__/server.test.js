'use strict';

const supergoose = require('@code-fellows/supergoose');
const app = require('../src/server.js');

const client = supergoose(app.app);

describe('The Server', () => {

  async function createRecord() {
    const data = {
      name: 'foo',
      password: 'bar',
    };
    const response = await client.post('/signup').send(data);
    return response.body;
  }

  it('can create a user', async () => {

    const record = await createRecord();
    console.log(record);
    expect(record.user.name).toBe('foo');
    expect(record.user.pass).not.toBe('bar');
    expect(record.token).not.toBeUndefined();
  });

  it('can sign in a user', async () => {

    await createRecord();
    const signin = await client.post('/signin').auth('foo', 'bar');
    console.log(signin.body);
    expect(signin.body.user.name).toBe('foo');
    expect(signin.body.user.pass).not.toBe('bar');
    expect(signin.body.token).not.toBeUndefined();
  });

  it('properly sends a 404 on an unknown route', async () => {
    const response = await client.get('/nothing');
    expect(response.status).toBe(404);
  });

  it('properly sends a 500 when an error occurs', async () => {
    const data = {};
    const response = await client.post('/signin').send(data);
    expect(response.status).toBe(403);
  });

});
