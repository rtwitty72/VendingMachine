const express = require('express');
const mongoose = require('mongoose');
const promise = require('bluebird');
const bodyParser =require('body-parser');
const Customer = require('../models/customer');
const app = express();

const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config.json")[nodeEnv];

app.use(bodyParser.json());

mongoose.connect(config.mongoURL);

app.get('/api/customers', (req, res)=>{
  Customer.find({}).then((customers) =>{
    res.json(customers);

});
});

app.post('/api/customers', (req, res) =>{
  const newCustomer = new Customer(req.body).save().then(customer =>{
    res.status(201).json({});
  });

});

app.get('/api/sanity', (req, res)=>{
  res.json({hello: 'Rhonda'});
});
















app.listen(3000);
module.exports = app;
