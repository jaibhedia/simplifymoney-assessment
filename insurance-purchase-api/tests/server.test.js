// tests/server.test.js
const request = require('supertest');
const app = require('../app');
const purchases = require('../data/purchases');

describe('Insurance Purchase API', () => {
  beforeEach(() => {
    // Reset purchases before each test
    purchases.length = 0;
  });

  test('GET /insurances should return a list of insurances', async () => {
    const res = await request(app).get('/insurances');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('POST /purchases should create a purchase', async () => {
    const res = await request(app)
      .post('/purchases')
      .send({ userId: 'user1', insuranceId: '1' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('purchaseId');
    expect(res.body.userId).toBe('user1');
    expect(res.body.insuranceId).toBe('1');
  });

  test('POST /purchases should return 400 if missing fields', async () => {
    const res = await request(app)
      .post('/purchases')
      .send({ userId: 'user1' }); // Missing insuranceId
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('userId and insuranceId are required');
  });

  test('POST /purchases should return 404 if insurance not found', async () => {
    const res = await request(app)
      .post('/purchases')
      .send({ userId: 'user1', insuranceId: '999' });
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Insurance not found');
  });

  test('GET /purchases/{purchaseId}/policy should return a PDF', async () => {
    // First, create a purchase
    const purchaseRes = await request(app)
      .post('/purchases')
      .send({ userId: 'user1', insuranceId: '1' });
    const purchaseId = purchaseRes.body.purchaseId;

    // Then, download the policy
    const res = await request(app).get(`/purchases/${purchaseId}/policy`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('application/pdf');
  });

  test('GET /purchases/{purchaseId}/policy should return 404 if purchase not found', async () => {
    const res = await request(app).get('/purchases/invalid-id/policy');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Purchase not found');
  });

  test('GET /insurances/curated should return curated insurances', async () => {
    const res = await request(app)
      .get('/insurances/curated')
      .query({ age: 25, gender: 'male', income: 50000 });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /insurances/curated should return 400 if missing query params', async () => {
    const res = await request(app).get('/insurances/curated');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('age, gender, and income are required');
  });
});