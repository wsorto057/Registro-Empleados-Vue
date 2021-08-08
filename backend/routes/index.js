
const express= require('express');
const router= express.Router();
const auth= require('../middleware/auth');

const empleadoController= require('../controllers/empleadoController');
const areaController= require('../controllers/areaController');
const subAreaController= require('../controllers/subAreaController');
const usuariosController=require('../controllers/usuariosController.js');


module.exports= function(){

    //empleados
    router.post('/empleados', auth.verificarUsuarioAdmin, empleadoController.nuevoEmpleado );
    router.get('/empleados', auth.verificarUsuario, empleadoController.mostrarEmpleados );
   // router.get('/empleados/:nombre', empleadoController.mostrarEmpleadoNombre );
    router.put('/empleados/:idEmpleado', auth.verificarUsuarioAdmin, empleadoController.actualizarEmpleado);
    router.delete('/empleados/:idEmpleado', auth.verificarUsuarioAdmin, empleadoController.eliminarEmpleado);
 
    
    //areas
    router.post('/areas', auth.verificarUsuarioAdmin, areaController.nuevoArea );
    router.get('/areas', auth.verificarUsuario, areaController.mostrarArea );
    router.put('/areas/:idArea', auth.verificarUsuarioAdmin, areaController.actualizarArea);
    router.delete('/areas/:idArea', auth.verificarUsuarioAdmin, areaController.eliminarArea);


    //subareas
    router.post('/subareas', auth.verificarUsuarioAdmin, subAreaController.nuevoSubArea );
    router.get('/subareas', auth.verificarUsuario, subAreaController.mostrarSubArea );
    router.put('/subareas/:idSubArea', auth.verificarUsuarioAdmin, subAreaController.actualizarSubArea);
    router.delete('/subareas/:idSubArea', auth.verificarUsuarioAdmin, subAreaController.eliminarSubArea);


    //usuarios
    router.post('/usuarios', auth.verificarUsuarioAdmin, usuariosController.nuevoUsuario);
    router.get('/usuarios', auth.verificarUsuario, usuariosController.mostrarUsuarios);
    router.post('/login', usuariosController.loginUsuario);


    return router;
}
