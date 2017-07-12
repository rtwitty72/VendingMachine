const expect = require('chai').expect;
const request = require('supertest');
const Item = require('../models/item');
const Customer = require('../models/customer');
const express = require('express');
const app = express();


  describe('basic API endpoint data tests', ()=>{

    beforeEach(done => {
      Customer.insertMany([
        {name: 'gum', qty: 1, price: 35},
        {name: 'candy bar', qty: 1, price: 80},
        {name: 'peanuts', qty: 1, price: 50}
      ]).then(done());
    });

    afterEach((done)=>{
      Customer.deleteMany({}).then(done());
    });

    it('customer API endpoint allows creation of items purchased', (done)=>{
      request(app)
      .post('/api/customer/item/5/purchase')
      .send({id: 4, name: 'aspirin', qty: 1, price: 90})
      .expect(201)
      .expect(res =>{
        Customer.count().then(count =>{
          expect(count).to.equal(4);
        });
      })
      .end(done);
    });

    it('customer API endpoint returns all customer items as json', (done) =>{
      request(app)
      .get('/api/sanity')
      .expect(200)
      .expect(res=>{
        expect(res.body[0].name).to.equal('gum');
        expect(res.body[1].name).to.equal('candy bar');
        expect(res.body[2].name).to.equal('peanuts');
        expect(res.body.length).to.equal(3);

      }).end(done);
    });
  });

  describe('basic model test', ()=>{

    beforeEach((done)=>{
      Customer.deleteMany({}).then(done());
    });

    after((done)=>{
      Customer.deleteMany({}).then(done());
    });

    it('test should clean up after itself',(done)=>{
      const customer = new Customer().save().then(newCustomer =>{
        Customer.count().then(count =>{
          expect(count).to.equal(1);
        });
        done();
      });

    });
    it('can create a customer purchase in the db and find it with mongoose syntax', (done)=>{
      const customer = new Customer({name: 'trail mix', qty: 2, price: 90})
      .save().then(newCustomer=>{
        expect(newCustomer.name).to.equal('trail mix');
        expect(newCustomer.qty).to.equal(2);
        expect(newCustomer.price).to.equal(90);
      });
      done();
      });
  });

  describe('basic API endpoint tests', ()=>{
    it('can access API endpoint and get success back',(done) =>{

    request(app)
    .get('/api/sanity')
    .expect(200, {hello: 'Rhonda'},done);
    });
  });

  describe('sanity test', () =>{
  it('should run test', ()=>{
    expect(1).to.equal(1);
  });
});
