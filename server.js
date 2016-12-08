// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://sfrag:daruma83@jello.modulusmongo.net:27017/esoHyn5u');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // definimos el modelo

    var Todo = mongoose.model('Todo', {
        text : String
    });

    // routes
    // api
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

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");



