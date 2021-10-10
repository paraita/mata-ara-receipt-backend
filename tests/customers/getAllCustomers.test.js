const setup = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/api/v1/customers'

describe('Get all the customers', function() {
  setup();
  it('Status code 200', async () => {
    const res = await request(app).get(url);
    expect(res.statusCode).to.equal(200);
  });

  it('Return an Array', async () => {
    const res = await request(app).get(url);
    expect(res.body).to.be.an('Array');
  });
});