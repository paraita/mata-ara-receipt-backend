const { setup, postPurchase} = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/api/v1/purchases'

describe('Get purchase with well-formed/existing id', function() {
  setup();
  it('has status code 200', async () => {
    let purchase = await postPurchase('RECEIPT1');
    const res = await request(app).get(url + '/' + purchase._id);
    expect(res.statusCode).to.equal(200);
  });
});

describe('Get purchase with invalid id', function() {
  setup();
  it('has status code 422', async () => {
    let purchase = await postPurchase('RECEIPT1');
    const res = await request(app).get(url + '/' + "WRONG_ID");
    expect(res.statusCode).to.equal(422);
  });
});

describe('Get purchase with well-formed/non-existing id', function() {
  setup();
  it('has status code 404', async () => {
    let purchase = await postPurchase('RECEIPT1');
    let wellFormedButNonExistingId = "61a43ffee124a6b61a86dc51";
    const res = await request(app).get(url + '/' + wellFormedButNonExistingId);
    expect(res.statusCode).to.equal(404);
  });
});
