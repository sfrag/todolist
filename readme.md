Esta aplicación utiliza:

mongodb para las bases de datos
node para la APIREST
Angular para la parte Frontend

Para poder ejecutarla primero de todo hay que poner a correr la base de datos, para ello podemos hacer:
    
    node server.js

Pero es mejor que instalemos nodemon con el comando: npm install -g nodemon y luego ejecutemos:

    nodemon server.js

Ya que nodemon incluye un watcher de manera que cada vez que se efectua un cambio en el servidor se refresca
de forma automática y esto resulta muy comodo.

Otra cosa a tener en cuenta es que estamos utilizando un hoting de bases de datos remoto que se llama Modulus.io

Hay por tanto que darse de alta en la web y crear una base de datos, nos dara una url que es la que tendremos
que colocar en nuestro archivo server.js:

mongoose.connect('mongodb://[user]:[pass]@jello.modulusmongo.net:27017/esoHyn5u');   

