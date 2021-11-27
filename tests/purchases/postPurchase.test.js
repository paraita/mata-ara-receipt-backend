const { setup } = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/api/v1/purchases'

describe('Posting new purchase', function() {

  setup();
  const postPayload = {
    receipt: 'RECEIPT_CONTENT_TEST',
    status: 'ACTIVE'
  };

  it('returns status code 201', async () => {
    const res = await request(app).post(url).send(postPayload);
    expect(res.statusCode).to.equal(201);
  });

  it('is active', async () => {
    const res = await request(app).post(url).send(postPayload);
    expect(res.body).has.property('status', postPayload.status);
  });

  it('has a receipt', async () => {
    const res = await request(app).post(url).send(postPayload);
    expect(res.body).has.property('receipt');
  });

});


// TODO: test posting twice (should return a 200)