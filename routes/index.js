const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');
const eventController = require('../controllers/eventController');

router.get('/', eventController.homePage);

router.get('/event/add', eventController.eventForm);
router.post('/event/add', eventController.addEvent);

// API
router.get('/get/events', eventController.getEvents);

module.exports = router;
