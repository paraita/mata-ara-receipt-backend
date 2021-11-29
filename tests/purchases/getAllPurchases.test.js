const { setup, postPurchase} = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/api/v1/purchases'

describe('Get all purchases (empty db)', function() {

  setup();

  it('has status code 200', async () => {
    const res = await request(app).get(url);
    expect(res.statusCode).to.equal(200);
  });

  it('returns an empty Array', async () => {
    const res = await request(app).get(url);
    expect(res.body).to.be.an('Array').that.is.empty;
  });
});

describe('Get all purchases (populated db)', function() {

  setup();

  it('has status code 200', async () => {
    await postPurchase('RECEIPT1');
    await postPurchase('RECEIPT2');
    const res = await request(app).get(url);
    expect(res.statusCode).to.equal(200);
  });

  it('returns a populated Array', async () => {
    await postPurchase('RECEIPT1');
    await postPurchase('RECEIPT2');
    const res = await request(app).get(url);
    expect(res.body).to.be.an('Array').with.lengthOf(2);
  });
});