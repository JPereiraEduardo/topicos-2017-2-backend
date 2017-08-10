var express = require('express');
var router = express.Router();

/* GET home page. */

var todos = [];

router.get('/', function (req, res, next) {

  console.log("Recebemos uma requisição GET");

  res.status(200).json(todos);

});

router.post('/', function (req, res, next) {

console.log("Recebemos uma requisição POST");
//console.log("Titulo: " + req.body.title);
//console.log("Descrição: " + req.body.description);

var todo = req.body;
todo.id = todoIndex++;
todos.push(todo);

res.status(200).send();
});






module.exports = router;
