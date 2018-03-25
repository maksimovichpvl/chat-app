const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const express = require('express');

const validatorOptions = require('./services/validation');

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(expressValidator(validatorOptions));
  app.use(express.static('build'));
};
 
