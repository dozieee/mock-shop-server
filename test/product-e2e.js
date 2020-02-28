import chai, { expect, assert, should } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';

import app from '../src/app';

// the should defination
should();

chai.use(chaiHttp);

describe('Add products', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5tYXJrQGVtYWlsLmNvbSIsImlhdCI6MTU1NjQ2Mjc1OCwiZXhwIjoxNTU2NTQ5MTU4fQ.TG9Iv5v5fc0rZPOiEeYrS3UToxpnecnIY-4MYi3eIrw';
  it('should add a product', (done) => {
    const newProduct = {
      name: faker.name.firstName(),
      description: 'test test test',
      category: 'book',
      price: parseFloat(3900.0),
      imageUrl: 'test image',
    };
    chai
      .request(app)
      .post('/api/v1/product/add-product')
      .set('Authorization', token)
      .send(newProduct)
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('success');
        response.body.data.should.have.property('name').eql(newProduct.name);
        response.body.data.should.have
          .property('description')
          .eql(newProduct.description);
        response.body.data.should.have
          .property('category')
          .eql(newProduct.category);
        response.body.data.should.have.property('price').eql(newProduct.price);
        response.body.data.should.have
          .property('imageUrl')
          .eql(newProduct.imageUrl);
        response.body.data.should.have.property('inStock').eql(true);
        done();
      });
  });

  // permision test
  // it('should return a status code of 401 error if the token passed is incorrect', (done) => {
  //   const token = 'wrong token';
  //   chai
  //     .request(app)
  //     .post('/api/v1/product/add-product')
  //     .set('Authorization', token)
  //     .send({})
  //     .end((error, response) => {
  //       response.body.should.be.a('object');
  //       response.should.have.status(401);
  //       response.body.should.have.property('status').eql('error');
  //       response.body.should.have
  //         .property('error')
  //         .eql('Not authorized to make this request');
  //       done();
  //     });
  // });
});

describe('Get products', () => {
  it('should get products', (done) => {
    chai
      .request(app)
      .get('/api/v1/product/get-product')
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.data.should.be.a('array');
        response.body.should.have.property('status').eql('success');
        if (response.body.data.length > 0) {
          expect(
            response.body.data[response.body.data.length - 1],
          ).to.have.property('name');
          expect(
            response.body.data[response.body.data.length - 1],
          ).to.have.property('description');
          expect(
            response.body.data[response.body.data.length - 1],
          ).to.have.property('category');
          expect(
            response.body.data[response.body.data.length - 1],
          ).to.have.property('price');

          expect(
            response.body.data[response.body.data.length - 1],
          ).to.have.property('imageUrl');
          expect(
            response.body.data[response.body.data.length - 1],
          ).to.have.property('inStock');
        }
        done();
      });
  });
});

describe('Edit products', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5tYXJrQGVtYWlsLmNvbSIsImlhdCI6MTU1NjQ2Mjc1OCwiZXhwIjoxNTU2NTQ5MTU4fQ.TG9Iv5v5fc0rZPOiEeYrS3UToxpnecnIY-4MYi3eIrw';
  it('should edit a product', (done) => {
    const newProduct = {
      description: faker.lorem.words(4),
      category: 'book',
      price: parseFloat(3900.0),
      imageUrl: 'test image' + faker.lorem.word(),
    };
    const productId = faker.random.number(25);
    chai
      .request(app)
      .patch('/api/v1/product/edit-product/' + productId)
      .set('Authorization', token)
      .send(newProduct)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('success');
        response.body.data.should.have.property('updated').eql(true);
        expect(response.body.data).to.have.property('id');
        done();
      });
  });

  it('should return a status code of 404 error if the product is not found', (done) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5tYXJrQGVtYWlsLmNvbSIsImlhdCI6MTU1NjQ2Mjc1OCwiZXhwIjoxNTU2NTQ5MTU4fQ.TG9Iv5v5fc0rZPOiEeYrS3UToxpnecnIY-4MYi3eIrw';
    chai
      .request(app)
      .patch('/api/v1/product/edit-product/1010')
      .set('Authorization', token)
      .send({})
      .end((error, response) => {
        response.body.should.be.a('object');
        response.should.have.status(404);
        response.body.should.have.property('status').eql('error');
        done();
      });
  });

  // permision test
  // it('should return a status code of 401 error if the token passed is incorrect', (done) => {
  //   const token = 'wrong token';
  //   chai
  //     .request(app)
  //     .post('/api/v1/product/add-product')
  //     .set('Authorization', token)
  //     .send({})
  //     .end((error, response) => {
  //       response.body.should.be.a('object');
  //       response.should.have.status(401);
  //       response.body.should.have.property('status').eql('error');
  //       response.body.should.have
  //         .property('error')
  //         .eql('Not authorized to make this request');
  //       done();
  //     });
  // });
});

//* the delete product test
describe('Delete Products', () => {
  it('should delete a specific product', (done) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5tYXJrQGVtYWlsLmNvbSIsImlhdCI6MTU1NjQ2Mjc1OCwiZXhwIjoxNTU2NTQ5MTU4fQ.TG9Iv5v5fc0rZPOiEeYrS3UToxpnecnIY-4MYi3eIrw';
    const productId = faker.random.number(26);
    chai
      .request(app)
      .delete(`/api/v1/product/delete-product/` + productId)
      .set('Authorization', token)
      .end((error, response) => {
        response.body.should.be.a('object');
        response.should.have.status(200);
        response.body.should.have.property('status').eql('success');
        response.body.data.should.have.property('deleted').eql(true);
        expect(response.body.data).to.have.property('id');
        done();
      });
  });

  it('should return a status code of 404 error if the product is not found', (done) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5tYXJrQGVtYWlsLmNvbSIsImlhdCI6MTU1NjQ2Mjc1OCwiZXhwIjoxNTU2NTQ5MTU4fQ.TG9Iv5v5fc0rZPOiEeYrS3UToxpnecnIY-4MYi3eIrw';
    chai
      .request(app)
      .delete(`/api/v1/product/delete-product/1010`)
      .set('Authorization', token)
      .end((error, response) => {
        response.body.should.be.a('object');
        response.should.have.status(404);
        response.body.should.have.property('status').eql('error');
        done();
      });
  });

  // permision test
  // it('should return a status code of 401 error if the token passed is incorrect', (done) => {
  //   const token = 'wrong token';
  //   chai
  //     .request(app)
  //     .delete(`/api/v1/products/delete-product/wrong-product-id`)
  //     .set('Authorization', token)
  //     .end((error, response) => {
  //       response.body.should.be.a('object');
  //       response.should.have.status(401);
  //       response.body.should.have.property('status').eql('error');
  //       response.body.should.have
  //         .property('error')
  //         .eql('Not authorized to make this request');
  //       done();
  //     });
  // });
});
