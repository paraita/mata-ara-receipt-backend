const { setup } = require('../test-helper');
const app = require('../../app');
const request = require('supertest');
const expect = require('chai').expect;

const url = '/api/v1/purchases/buy';

const receipt = {
  appAccountToken: '1234567890'
};

describe('Post new receipt test', function() {
  setup();
  it('Status Code 200', async () => {
    const res = await request(app).post(url).send(receipt);
    expect(res.statusCode).to.equal(200);
  });

  it('Return an object', async() => {
    const res = await request(app).post(url).send(receipt);
    expect(res.body).to.be.an('Object');
  });

  it('Object has id', async() => {
    const res = await request(app).post(url).send(receipt);
    expect(res.body).has.property('_id', res.body._id);
  });

  it('Object has receipt property', async() => {
    const res = await request(app).post(url).send(receipt);
    expect(res.body).has.property('receipt');
  });

  it('Receipt is and Array', async() => {
    const res = await request(app).post(url).send(receipt);
    expect(res.body.receipt).to.be.an('Array');
  });

  it('Object has a status', async() => {
    const res = await request(app).post(url).send(receipt);
    expect(res.body).has.property('status', 'A');
  });
});
