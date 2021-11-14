const { setup, postReceipt } = require('../test-helper');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../app');

const url = '/api/v1/purchases/refund';
const receipt = {
  appAccountToken: '1234567890'
};


describe('Update product sell status', function () {
  setup();
  it('Status code 200', async () => {
    await postReceipt(receipt);
    const res = await request(app).post(url).send(receipt);
    expect(res.status).to.equal(200);
  });

  it('Return an object', async () => {
    await postReceipt(receipt);
    const res = await request(app).post(url).send(receipt);
    expect(res.body).to.be.an('Object');
  });

  it('Object has receipt property', async () => {
    await postReceipt(receipt);
    const res = await request(app).post(url).send(receipt);
    expect(res.body).has.property('receipt');
  });

  it('Object has a status', async() => {
    await postReceipt(receipt);
    const res = await request(app).post(url).send(receipt);
    expect(res.body).has.property('status');
  });

  it('Status has been updated to refund', async() => {
    await postReceipt(receipt);
    const res = await request(app).post(url).send(receipt);
    expect(res.body).has.property('status', 'R');
  });
});
