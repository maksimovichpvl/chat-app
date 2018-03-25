"use strict";

const express = require('express');
const messagesController = require('../controllers/messagesController');
const router = express.Router();
const messagesRouter = require('./messagesRouter');

router.use('/messages', messagesRouter);

module.exports = router;
