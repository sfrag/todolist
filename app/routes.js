// routes

// load the todo model
var Todo = require('./models/todo.js');

// expose the routes to our app with module.exports
module.exports = function(app) {

    // api ------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res){
        // usamos mongoose para obtener todos los todos de la base de datos
        Todo.find(function(err, todos){
            // si hay un error, enviamos el error
            if (err)
                res.send(err)
            res.json(todos); // devuelve todos los todos en formato json
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res){
        // create a todo, la informacion viene de una peticion AJAX de angular
        Todo.create({
            text : req.body.text,
            done: false
        }, function(err, todo){
            if (err)
                res.send(err);
            // get and return all the todos after you create another
            Todo.find(function(err, todos){
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res){
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo){
            if (err)
                res.send(err);
            
            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                    if (err)
                        res.send(err)
                    res.json(todos);
            });
        });
    });

    // application
    app.get('*', function(req, res){
        res.sendfile('./public/index.html'); //carga el html de una sola vista 
    });
};

    