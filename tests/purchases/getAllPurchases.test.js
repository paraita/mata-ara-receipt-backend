const { setup } = require('../test-helper');
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

// TODO: test with a populated db
