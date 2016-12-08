
var appTodo = angular.module('appTodo', []);

function mainController($scope, $http){
    $scope.formData = {};

    // cuando se lance la pagina, obtenemos todos los todos y los mostramos

    $http.get('/api/todos')
        .success(function(data){
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error: ' + data);
        });

    // Cuando introducimos el formulario de añadir tarea, enviamos el texto a la API de node
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data){
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })

            .error(function(data){
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data){
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
    };
}