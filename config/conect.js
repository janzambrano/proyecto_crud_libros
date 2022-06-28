var mysql = require('mysql');
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biblioteca'
});

conexion.connect(
    (err) => {
        if (!err){
            console.log('Conexión exitosa con Mysql');
        } else {
            console.log('Error de conexión con Mysql');
        }
    }
);

module.exports = conexion;