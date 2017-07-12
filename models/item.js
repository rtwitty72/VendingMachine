const express = require('express');
const mongoose = require('mongoose');
const promise = require('bluebird');
const bodyParser =require('body-parser');
const Item = require('../models/item');
const app = express();

const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config.json")[nodeEnv];

app.use(bodyParser.json());

mongoose.connect(config.mongoURL);

app.get('/api/items/purchases', (req, res)=>{
  Item.find({}).then((items) =>{
    res.json(items);

});
});

app.post('/api/items', (req, res) =>{
  const newItem = new Item(req.body).save().then(item =>{
    res.status(201).json({});
  });

});

app.get('/api/sanity', (req, res)=>{
  res.json({hello: 'Rhonda'});
});
















app.listen(3000);


module.exports = app;
