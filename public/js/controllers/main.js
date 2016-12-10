angular.module('todoController', [])

    .controller('mainController', function($scope, $http, Todos){
        $scope.formData = {};

        // cuando se lance la pagina, obtenemos todos los todos y los mostramos

        Todos.get()
            .success(function(data){
                $scope.todos = data;
            });
        
        // Cuando introducimos el formulario de añadir tarea, enviamos el texto a la API de node
        $scope.createTodo = function() {
            
            // Hacemos una validacion de formData para estar seguros de que hay algo en el campo
            // Si el campo está vacio no pasara nada
            // Si queremos hacer esta comprobacion necesitaremos incluir la libreria de jQuery
            //if (!$.isEmptyObject($scope.formData)){  
                
                Todos.create($scope.formData)
                    .success(function(data){
                        $scope.formData = {};
                        $scope.todos = data;
                    });
            //}
        };

        // DELETE =======================
        // delete a todo after checking it
        $scope.deleteTodo = function(id) {
            Todos.delete(id)
                .success(function(data){
                    $scope.todos = data; 
                });
        };
    });