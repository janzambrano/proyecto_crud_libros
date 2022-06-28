module.exports = {
    
    obtener: function (conexion, funcion){
        conexion.query ("SELECT * FROM libros", funcion); // esta función muestra la lista de libros completa de la base de datos mysql biblioteca
    },

    insertar: function (conexion, datos, archivo, funcion){
        conexion.query ("INSERT INTO libros ( nombre, imagen ) VALUES ( ?,? )", [datos.nombre, archivo.filename], funcion); // esta función inserta datos en la lista de libros de la base de datos mysql biblioteca, proveniente de el formulario crear nuevo libro, también podemos ver el código de inserción de datos desde mysql y la opción insert y copiarlo y pegarlo aca si no sabemos como utilizarlo, importante los nombres de los datos deben coincidir con los "name" de los campos, se agrega en los parámetros de la función "archivos"
    },

    retornarDatosID: function (conexion, id, funcion){
        conexion.query ("SELECT * FROM libros WHERE id=?", [id], funcion); // esto es para retornar los datos del id que del libro que se desea eliminar para identificar la imagen y asi eliminar misma del carpeta images
    },

    borrar: function (conexion, id, funcion){
        conexion.query ("DELETE FROM libros WHERE id=?", [id], funcion); // esto es para eliminar el registro del libro que deseamos borrar en la base de datos con el botón borrar
    },

    actualizar: function (conexion, datos, funcion){
        conexion.query ("UPDATE libros SET nombre=? WHERE id=?", [datos.nombre, datos.id], funcion); // esta función actualiza el nombre del libro seleccionado por el botón editar
    },

    actualizarArchivo: function (conexion, datos, archivo, funcion){
        conexion.query ("UPDATE libros SET imagen=? WHERE id=?", [archivo.filename, datos.id], funcion); // esta función actualiza el archivo del libro seleccionado por el botón editar
    }

}