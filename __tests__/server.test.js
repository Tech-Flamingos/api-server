const { app } = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);

var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);

before(function (done) {
  mockgoose.prepareStorage().then(function () {
    mongoose.connect('mongodb://example.com/TestingDB', function (err) {
      done(err);
    });
  });
});

describe('API Server', () => {
  test('can sign in', async () => {
    const response = await request.post('/signup').send();
    expect(response.status).toEqual(404);
  });
});
