// server.test.js
const request = require('supertest');
const app = require('./server');

describe('Insurance Purchase API', () => {
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

  test('GET /insurances/curated should return curated insurances', async () => {
    const res = await request(app)
      .get('/insurances/curated')
      .query({ age: 25, gender: 'male', income: 50000 });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});