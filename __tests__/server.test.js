const request = require('supertest');
const { app, connectToMongoDB } = require('../src/server');
const User = require('../src/auth/models/testUsers');
const mongoose = require('mongoose');


let user;

beforeAll(async () => {
  await connectToMongoDB();
  user = new User({
    name: 'testuser',
    password: 'password',
    role: 'admin',
  });
  await user.save();
});

afterAll(async () => {
  await User.collection.drop();
  await mongoose.connection.close();
});

describe('User routes', () => {

  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/testSignup')
        .send({
          name: 'newuser',
          password: 'password',
          role: 'admin',
        });
      expect(res.status).toEqual(201);
      expect(res.body.user.name).toEqual('newuser');
      expect(res.body.user.role).toEqual('admin');
    });

    it('should return a 500 error if there is a database validation error', async () => {
      const res = await request(app)
        .post('/signup')
        .send({
          password: 'password',
          role: 'admin',
        });
      expect(res.statusCode).toEqual(500);
    });

    it('should return a 404 error if the path is not /signup', async () => {
      const res = await request(app)
        .post('/sign')
        .send({
          password: 'password',
          role: 'admin',
        });
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('POST /signin', () => {
    it('should log in a user with the correct username and password', async () => {
      const res = await request(app)
        .post('/testSignin')
        .auth('testuser', 'password');
      expect(res.statusCode).toEqual(200);
      expect(res.body.user).toHaveProperty('name', 'testuser');
    });

    it('should return a 404 error if the password is incorrect', async () => {
      const res = await request(app)
        .post('/login')
        .auth('testuser', 'incorrectpassword');
      expect(res.statusCode).toEqual(404);
    });

    it('should return a 404 error if the username does not exist', async () => {
      const res = await request(app)
        .post('/login')
        .auth('nonexistentuser', 'password');
      expect(res.statusCode).toEqual(404);
    });
  });
});
