var express = require("express");
var todos = express.Router();

var todoIndex = [];
var todosList = [];

todos.get('/', function (req, res, next) {

    console.log("Recebemos uma requisição GET");

    res.status(200).json(todosList);
});

todos.get('/:todoId', function (req, res, next) {
    console.log("Recebemos uma requisição GET");

    var todo = findTodoById(req.params.todoId);

    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).send();
    }

});

todos.post('/', function (req, res, next) {
    console.log("Recebemos uma requisição POST");

    //recebe os dados da Todo
    var todo = req.body;
    todo.id = todoIndex++;
    todo.completed = false;

    //insere a todo no "banco de dados"
    todosList.push(todo);

    res.status(201).send();
});

todos.put('/:todoId', function (req, res, next) {
    var todo = findTodoById(req.params.todoId);

    if (todo) {
        //alteração
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.completed = req.body.completed;

        res.status(200).json(todo);
    } else {
        res.status(404).send();
    }
});

todos.delete('/:todoId', function(req, res, next){

    // busco o indice da Todo no "banco de dados"
    var index = todosList.findIndex(function(todo, index){
        return todo.id === parseInt(req.params.todoId);
    });

    if(index >= 0){
    // removo a Todo do "banco de dados"
    todosList.splice(index, 1);

    res.status(200).send();
    }else{
        res.status(404).send();
    }
});

function findTodoById(todoId) {
    var todosFiltered =
        todosList.filter(function (todo, index) {
            return todo.id === parseInt(todoId);
        });
    if (todosFiltered.length > 0)
        return todosFiltered[0];
    return null;
}


// Definições das rotas

module.exports = todos;