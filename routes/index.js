var express = require('express');
var router = express.Router();
var todos = [];
var todoIndex = 0;


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Recebemos uma requisição GET");

  res.status(200).json(todos);
});
router.post('/', function (req, res, next){
  console.log("Recebemos uma requisição POST");



  var todo = req.body;
todo.id = todoIndex++;
  todos.push(todo);

  res.status(200).send();
});

module.exports = router;
