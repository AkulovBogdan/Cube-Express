var express = require('express');
var router = express.Router();

var authController = require('../controllers/authController');
/* GET home page. */
router.get('/', authController.index);
router.post('/', authController.login);

module.exports = router;