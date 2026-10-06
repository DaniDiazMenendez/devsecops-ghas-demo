const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { createApp } = require('../src/app');

test('health endpoint returns ok', async () => {
  const response = await request(createApp()).get('/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
});

test('api rejects unauthenticated requests', async () => {
  const response = await request(createApp()).get('/api/accounts/1001');

  assert.equal(response.status, 401);
});

test('api returns account for authorized demo user', async () => {
  const response = await request(createApp())
    .get('/api/accounts/1001')
    .set('x-demo-user', 'demo-user');

  assert.equal(response.status, 200);
  assert.equal(response.body.id, '1001');
});

test('transfer validates payload before processing', async () => {
  const response = await request(createApp())
    .post('/api/transfers')
    .set('x-demo-user', 'demo-user')
    .send({ fromAccountId: '1001', toAccountId: '2002', amount: -10 });

  assert.equal(response.status, 400);
});

