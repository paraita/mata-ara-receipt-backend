const { setup, postPurchase} = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/api/v1/purchases'

describe('Posting new (valid) purchase', function() {
  setup();
  const postPayload = {
    receipt: 'RECEIPT_CONTENT_TEST'
  };
  it('returns status code 201', async () => {
    const res = await request(app).post(url).send(postPayload);
    expect(res.statusCode).to.equal(201);
  });
  it('has an id', async () => {
    const res = await request(app).post(url).send(postPayload);
    expect(res.body).has.property('id');
  });
});

describe('Posting new empty purchase', function() {
  setup();
  const postPayload = {
    receipt: ''
  };
  it('returns status code 422', async () => {
    const res = await request(app).post(url).send(postPayload);
    expect(res.statusCode).to.equal(422);
  });
});

describe('Posting existing purchase', function() {
  setup();
  const postPayload = {
    receipt: 'RECEIPT_CONTENT_TEST'
  };
  it('returns status code 201', async () => {
    await postPurchase(postPayload.receipt);
    const res = await request(app).post(url).send(postPayload);
    expect(res.statusCode).to.equal(200);
  });
  it('has an id', async () => {
    await postPurchase(postPayload.receipt);
    const res = await request(app).post(url).send(postPayload);
    expect(res.body).has.property('id');
  });
});