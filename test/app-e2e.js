import chai, { expect, assert, should } from 'chai';
import chaiHttp from 'chai-http';

import app from '../src/app';

// the "should" defination
should();

chai.use(chaiHttp);

describe('App entry point test', () => {
  it('should load up the server succuessfully', (done) => {
    chai
      .request(app)
      .get('/api/v1')
      .end((error, response) => {
        response.body.should.be.a('object');
        response.body.data.should.have
          .property('message')
          .eql('This is Mock shop');
        response.status.should.be.eql(200);
        done();
      });
  });
});
