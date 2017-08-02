var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.send("Olá Node JS! Agora com Nodemon");

});

module.exports = router;
