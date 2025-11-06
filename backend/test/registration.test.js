import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import User from '../models/User.js';
import UserCreds from '../models/UserCreds.js';

console.log("Here I am");

const VALID_DATA = {
  name: 'Jay Tiwari',
  email: 'tiwarijai999@gmail.com',
  phoneNumber: '7489096913',
  password: 'W4lk3r@1',
  confirmPassword: 'W4lk3r@1',
  acceptTerms: true
};

const NAME_WITH_NUMBERS = {
  ...VALID_DATA,
  name: 'Jay123'  
};

const INVALID_EMAIL = {
  ...VALID_DATA,
  email: 'invalid-email'
};

const SHORT_NAME = {
  ...VALID_DATA,
  name: 'J'    
};

const WEAK_PASSWORD = {
  ...VALID_DATA,
  password: 'password',  // 6+ chars but no numbers
  confirmPassword: 'password'
};

const PASSWORD_MISMATCH = {
  ...VALID_DATA,
  confirmPassword: 'different123'
};

const SHORT_PASSWORD = {
  ...VALID_DATA,
  password: 'ab1',   
  confirmPassword: 'ab1'
};

const TERMS_NOT_ACCEPTED = {
  ...VALID_DATA,
  acceptTerms: false
};

// helper to support both express-validator v6+ (param) and some variants using path
function hasErrorFor(errors, fieldName) {
  return errors.some(err => err.param === fieldName || err.path === fieldName);
}

describe('POST /api/register', () => {
  // Mock model DB operations so tests don't require a live database
  before(() => {
    // default: no existing user
    User.findOne = async () => null;
    User.create = async (obj) => ({ _id: 'mock-user-id', ...obj });
    UserCreds.create = async (obj) => ({ _id: 'mock-creds-id', ...obj });
  });

  it('should register user with valid data', async () => {
    const res = await request(app).post('/api/register').send(VALID_DATA);

    expect(res.status).to.equal(201);
    // Controller message may vary; ensure a success message exists
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.be.a('string');
  });

  it('should fail if name contains numbers', async () => {
    const res = await request(app)
      .post('/api/register')
      .send(NAME_WITH_NUMBERS);

    expect(res.status).to.equal(400);
    expect(res.body.errors).to.be.an('array');
    expect(hasErrorFor(res.body.errors, 'name')).to.be.true;
  });

  it('should fail if email format is invalid', async () => {
    const res = await request(app)
      .post('/api/register')
      .send(INVALID_EMAIL);

    expect(res.status).to.equal(400);
    expect(res.body.errors).to.be.an('array');
    expect(hasErrorFor(res.body.errors, 'email')).to.be.true;
  });
});

describe('User Validation - Name Rules', () => {
  it('should fail when name is too short', async () => {
    const res = await request(app)
      .post('/api/register')
      .send(SHORT_NAME);

    expect(res.status).to.equal(400);
    expect(res.body.errors).to.be.an('array');
    expect(hasErrorFor(res.body.errors, 'name')).to.be.true;
  });
});

describe('User Validation - Password Rules', () => {
  it('should fail with invalid password (weak or short)', async () => {
   
    const weakRes = await request(app)
      .post('/api/register')
      .send(WEAK_PASSWORD);

    expect(weakRes.status).to.equal(400);
    expect(weakRes.body.errors).to.be.an('array');
    expect(hasErrorFor(weakRes.body.errors, 'password')).to.be.true;

    // Test short password
    const shortRes = await request(app).post('/api/register').send(SHORT_PASSWORD);
    expect(shortRes.status).to.equal(400);
    expect(shortRes.body.errors).to.be.an('array');
    expect(hasErrorFor(shortRes.body.errors, 'password')).to.be.true;
  });

  it('should fail when passwords do not match', async () => {
    const res = await request(app)
      .post('/api/register')
      .send(PASSWORD_MISMATCH);

    expect(res.status).to.equal(400);
    expect(res.body.errors).to.be.an('array');
    expect(hasErrorFor(res.body.errors, 'confirmPassword')).to.be.true;
  });
});

 
