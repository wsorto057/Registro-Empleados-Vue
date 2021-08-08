const Areas= require('../models/Areas');

//nueva Area
exports.nuevoArea=async(req, res, next) =>{
    const area= new Areas(req.body);

    try {
        await area.save();
        res.json({
            mensaje: 'Area agregado correctamente'
        });
    } catch (error) {
        res.status(500).send({
            message:'Ocurrió un error'
        });
        res.send(error);
        next();
    }
}


//mostrar Areas
exports.mostrarArea=async(req, res, next) =>{
    try {
        const area= await Areas.find({});
        res.json(area);
    } catch (error) {
        res.status(500).send({
            message:'Ocurrió un error'
        });
        res.send(error);
        next();
    }
}

//mostrar Area por nombre


//actualizar Area
exports.actualizarArea=async(req, res, next) =>{
    try {
        await Area.findByIdAndUpdate({_id: req.params.idArea}, req.body, {new: true});
        res.json({
           mensaje: 'Area actualizado correctamente'
       });
   } catch (error) {
       res.status(500).send({
           message:'Ocurrió un error'
       });
       res.send(error);
       next(error);
   }
}

//eliminar Area
exports.eliminarArea=async(req, res, next) =>{
    try {
        await Areas.findByIdAndRemove({_id: req.params.idArea});
        res.json({
            mensaje: 'Area eliminado correctamente'
        });
    } catch (error) {
        res.status(500).send({
            message:'Ocurrió un error'
        });
        res.send(error);
        next(error);
    }
}