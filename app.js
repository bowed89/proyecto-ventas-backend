var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

//ROUTES
var user_routes = require('./routes/user');
var categoria_routes = require('./routes/categoria');
var producto_routes = require('./routes/producto');
var cliente_routes = require('./routes/cliente');
var venta_routes = require('./routes/venta');

var app = express();



/*
useUnifiedTopology: true, useNewUrlParser: true elimina la advertencia cuando se inicializa el node -->
current URL string parser is deprecated, and will be removed in a future version. To use the new parser, 
pass option { useNewUrlParser: true } to MongoClient.connect
*/
mongoose.connect('mongodb://localhost:27017/ventasDB', { useUnifiedTopology: true, useNewUrlParser: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Corriendo servidor');
        app.listen(port, function() {
            console.log('Servidor conectado en el puerto ' + port);
        });
    }
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.use('/api', user_routes);
app.use('/api', categoria_routes);
app.use('/api', producto_routes);
app.use('/api', cliente_routes);
app.use('/api', venta_routes);

module.exports = app;