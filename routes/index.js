var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const keys = require('../config/keys');

// user should be required before requiring passport
require('../models/user');
require('../services/passport');


mongoose.connect(keys.mongoURI);
console.log("Connected to ", keys.mongoURI);
require('../routes/authRoutes')(router);
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send({hi: "there"});
});

module.exports = router;
