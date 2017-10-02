var express = require('express');
var router = express.Router();

var registrationController = require('../controllers/registrationController');
router.get('/', registrationController.index);
router.post('/', registrationController.validate);

module.exports = router;