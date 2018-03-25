"use strict";

const express = require('express');
const messagesController = require('../controllers/messagesController');
const validatorMessages = require('../services/validation/messagesValidation');
const router = express.Router();
const messagesRouter = express.Router();

messagesRouter.route('/')
  .get(messagesController.getAll)
  .post(validatorMessages, messagesController.createMessage)

module.exports = messagesRouter;