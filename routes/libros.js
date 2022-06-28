var express = require('express');
var router = express.Router();
const librosController = require('../controllers/librosController');

var multer = require('multer'); //requiriendo multer previamente instalado por consola con el comando "npm install --save multer" para procesar archivos adjuntos en un formulario
var fecha = Date.now(); //esto es para agregar al nombre del archivo la fecha y hora para crear asi un nombre único y no sobrescriba un archivo con el mismo nombre
var rutaDeAlmacenamiento = multer.diskStorage(
    {
        destination: function(request, file, callback){
            callback(null, './public/images/'); // esta funcion especifica en que carpeta se guardara la imagen, esto es según la documentación de multer
        },
        filename:function(request, file, callback){
            console.log(file);
            callback(null, fecha + "_" + file.originalname);// esta función es para agregar la fecha al nombre del archivo y asi modificarlo
        }
    }

);

var cargar = multer({ storage:rutaDeAlmacenamiento}); // aca creamos un elemento para la carga del archivo

/* rutas de libros*/
router.get('/', librosController.index);
router.get('/crear', librosController.crear); // ruta para crear nuevo libro

router.post('/', cargar.single('archivo'), librosController.guardar); //esto recibe los datos desde el formulario y en librosController.js se crea la función para procesar los mismos, aca sufre una ligera modificación para agregar el archivo del formulario que es este código "cargar.single('archivo'),"

router.post('/eliminar/:id', librosController.eliminar); // creamos la ruta para eliminar un libro especifico de la lista, con el botón de eliminar, ademas de esto se coloca la ruta con el id del libro que se desea eliminar ya que si no se coloca el id no se sabe cual es el libro que se debe eliminar

router.get('/editar/:id', librosController.editar); // creamos la ruta para editar un libro especifico de la lista, con el botón de editar, ademas de esto se coloca la ruta con el id del libro que se desea editar ya que si no se coloca el id no se sabe cual es el libro que se debe editar, importante se debe colocar método get para procesar el formulario como se coloco en la vista del formulario

router.post('/actualizar', cargar.single('archivo'), librosController.actualizar); // con esto subimos los datos modificados en el formulario editar en a la base de datos 

module.exports = router;