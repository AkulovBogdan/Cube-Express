var express = require('express');
var router = express.Router();

var gameController = require('../controllers/gameController');
var auth = require('../components/authComponent');
/* GET home page. */
router.get('/', auth.checkAuth, gameController.index);

module.exports = router;
