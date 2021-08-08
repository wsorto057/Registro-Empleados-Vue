const Empleados= require('../models/Empleados');

// nuevo empleado
exports.nuevoEmpleado=async(req, res, next) =>{
    const empleado= new Empleados(req.body);

    try {
        await empleado.save();
        res.json({
            mensaje: 'Empleado agregado correctamente'
        });
    } catch (error) {
        res.status(500).send({
            message:'Ocurrió un error'
        });
        res.send(error);
        next();
    }
}

//mostrar todos los empleados
exports.mostrarEmpleados=async(req, res, next) =>{
    try {
        const empleado= await Empleados.find({});
        res.json(empleado);
    } catch (error) {
        res.status(500).send({
            message:'Ocurrió un error'
        });
        res.send(error);
        next();
    }
}



//actualizar empleado
exports.actualizarEmpleado=async(req, res, next) =>{
    try {
        await Empleados.findByIdAndUpdate({_id: req.params.idEmpleado}, req.body, {new: true});
        res.json({
           mensaje: 'Empleado actualizado correctamente'
       });
   } catch (error) {
       res.status(500).send({
           message:'Ocurrió un error'
       });
       res.send(error);
       next();
   }
}


//eliminar empleado
exports.eliminarEmpleado=async(req, res, next) =>{
    try {
        await Empleados.findByIdAndRemove({_id: req.params.idEmpleado});
        res.json({
            mensaje: 'Empleado eliminado correctamente'
        });
    } catch (error) {
        res.status(500).send({
            message:'Ocurrió un error'
        });
        res.send(error);
        next();
    }
}