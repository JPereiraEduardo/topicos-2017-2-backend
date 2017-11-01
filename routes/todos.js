var express = require("express");
var todos = express.Router();

var todosList = [
    {
        "title": "Tarefas de Teste",
        "description": "Descrição da tarefa",
        "id": 2,
        "completed": false
    },
    {
        "title": "Tarefas de Teste",
        "description": "Descrição da tarefa",
        "id": 3,
        "completed": false
    },
    {
        "title": "Tarefas de Teste",
        "description": "Descrição da tarefa",
        "id": 4,
        "completed": false
    },
    {
        "title": "Tarefas de Teste",
        "description": "Descrição da tarefa",
        "id": 5,
        "completed": false
    },
    {
        "title": "Tarefas de Teste",
        "description": "Descrição da tarefa",
        "id": 6,
        "completed": false
    },
    {
        "title": "Tarefas de Teste",
        "description": "Descrição da tarefa",
        "id": 7,
        "completed": false
    },
    {
        "title": "Tarefas de Teste",
        "description": "Descrição da tarefa",
        "id": 8,
        "completed": false
    },
    {
        "title": "Tarefas de Teste",
        "description": "Descrição da tarefa",
        "id": 9,
        "completed": false
    }
];
var todoIndex = 10;


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

    var todo = req.body;
    todo.id = todoIndex++;
    todo.completed = false;

    todosList.push(todo);

    res.status(201).send();
});

todos.delete('/:todoId', function (req, res, next) {
    var index = todosList.findIndex(function (todo, index) {
        return todo.id === parseInt(req.params.todoId);
    });
    if (index >= 0) {
        todosList.splice(index, 1);
        res.status(200).send();
    } else {
        res.status(404).send();
    }



});
todos.put('/:todoId', function (req, res, next) {
    var todo = findTodoById(req.params.todoId);

    if (todo) {
        // alteração
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.completed = req.body.completed;

        res.status(200).json(todo);
    } else {
        res.status(404).send();
    }


});
function findTodoById(todoId) {
    var todosFiltered = todosList.filter(function (todo, index) {
        return todo.id === parseInt(todoId);
    });
    if (todosFiltered.length > 0)
        return todosFiltered[0];
    return null;
}

todos.put('/:todoId/completed', (req, res) => {
    const todoId = req.params.todoId;
    completedTodo(todoId, true, res);


});

todos.delete('/:todoId/completed', (req, res) => {
    const todoId = req.params.todoId;
    completedTodo(todoId, false, res);

});

const completedTodo = (todoId, completed, res) => {
    const todo = { completed: completed };

    Todo.update(todo, {
        where: {
            id: todoId
        }
    }).then(result => {
        const registroAfetados = result[0];
        if (registroAfetados > 0) {
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    }).catch(ex => {
        console.error(ex);
        res.status(400).send();
    })

}



module.exports = todos;