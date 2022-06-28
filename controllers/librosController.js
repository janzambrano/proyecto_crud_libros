var conexion = require('../config/conect');
const libro = require('../model/librodb');
var libros = require('../model/librodb');
var borrar = require('fs');

module.exports = {

    index:function(req, res){
        
        libro.obtener (conexion, function(err, datos){
            console.log(datos);
            res.render('libros/index', { title: 'Aplicación con NodeJS, Express y CRUD', libros:datos }); // esto es para obtener la lista de todos los libros desde la base de datos mysql "biblioteca" y mostrar en la vista de lista de libros
        });        
    },

    crear:function (req, res) {
        res.render('libros/crear');
    },

    guardar:function (req, res){
        /*res.send(req.body); // con esto puedo verificar si se están recibiendo todos los datos correctamente desde el formulario en el navegador*/
        console.log(req.body); // para mostrar en consola lo ingresado en el formulario

        //console.log(req.file.filename); // con esto imprimimos en consola el nuevo nombre del archivo

        libro.insertar (conexion, req.body, req.file, function(err){
             res.redirect('/libros'); // esto insertaría los datos del formulario de crear nuevo libro en la base de datos mysql "biblioteca" y luego redireccionará a la pagina de lista de todos los libros, se agrega este código "req.file," para insertar el nuevo nombre del archivo en la base de datos
        }); 
    },

    eliminar:function (req, res){
        console.log("Recepción de datos"); // para confirmar si se esta ejecutando la función eliminar libro 

        console.log(req.params.id); // para mostrar en consola si el libro seleccionado correctamente para borrar coincide con el id

            libro.retornarDatosID(conexion, req.params.id, function(err, registros){

                var nombreImagen = "public/images/" + (registros[0].imagen);
                console.log(nombreImagen);// esto nos devuelve la ruta completa con el nombre de la imagen del libro que deseamos eliminar

                if(borrar.existsSync(nombreImagen)){
                borrar.unlinkSync(nombreImagen); // con esto verificamos si el archivo esta en la carpeta de ser asi procede a eliminar el archivo
                }

                libro.borrar(conexion, req.params.id, function(err){

                res.redirect('/libros');

                }); 
    
            }
        
    );},

    editar: function (req, res){

        libro.retornarDatosID(conexion, req.params.id, function(err, registros){
            console.log(registros[0]);
            res.render('libros/editar', {libro:registros[0]}); // esto es para devolver los datos al formulario y rellenar los campos
        });    

    },

    actualizar: function name(req,res){

        console.log(req.body.nombre);

        if(req.body.nombre){
            libro.actualizar(conexion, req.body, function (err){                
            });
        }

        //res.redirect('/libros');

        if(req.file.filename){

                libro.retornarDatosID(conexion, req.body.id, function(err, registros){

                    var nombreImagen = "public/images/" + (registros[0].imagen);    
                    if(borrar.existsSync(nombreImagen)){
                        borrar.unlinkSync(nombreImagen); // con esto verificamos si el archivo esta en la carpeta de ser asi procede a eliminar el archivo
                    }
    
                    libro.actualizarArchivo (conexion, req.body, req.file, function (err){}); 
        
                });

                    res.redirect('/libros');

            }
        }

    }
