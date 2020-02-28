import chai, { expect, assert, should } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';

import app from '../src/app';

// the "should" defination
should();

chai.use(chaiHttp);

describe('user Signup', () => {
  it('should create a new user', (done) => {
    const newUser = {
      email: faker.internet.email(),
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      password: 'password',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('success');
        expect(response.body.data).to.have.property('token');
        expect(response.body.data).to.have.property('user');
        expect(response.body.data).to.have.property('expiresIn');
        expect(response.body.data.user).to.have.property('id');
        expect(response.body.data.user).to.have.property('isAdmin');
        done();
      });
  });
  // i did not write any test for the
  it('should throw an error detailes is incorrect or and already registerd detial => (email)', (done) => {
    const newUser = {
      email: 'test@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('status').eql('error');
        expect(response.body).to.have.property('error');
        response.body.should.have
          .property('error')
          .eql('Signup failed, You are already registered');
        done();
      });
  });
});

describe('user Signin', () => {
  it('should sign the user in and send back token + meta-data', (done) => {
    const newUser = {
      email: 'admin@gmail.com',
      password: 'password',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(newUser)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('success');
        expect(response.body.data).to.have.property('token');
        expect(response.body.data).to.have.property('user');
        expect(response.body.data).to.have.property('expiresIn');
        expect(response.body.data.user).to.have.property('id');
        expect(response.body.data.user).to.have.property('isAdmin');
        done();
      });
  });
});
