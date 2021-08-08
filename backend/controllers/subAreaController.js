const Subs =require('../models/Subareas');

//nueva subarea
exports.nuevoSubArea=async(req, res, next) =>{
    const subArea= new Subs(req.body);

    try {
        await subArea.save();
        res.json({
            mensaje: 'SubArea agregado correctamente'
        });
    } catch (error) {
        res.status(500).send({
            message:'Ocurrió un error'
        });
        res.send(error);
        next();
    }
}



//mostrar subarea
exports.mostrarSubArea=async(req, res, next) =>{
    try {
        const subArea= await Subs.find({}).populate('nombre').populate({
            model:'Areas'
        });
        res.json(subArea);
    } catch (error) {
        res.status(500).send({
            message:'Ocurrió un error'
        });
        res.send(error);
        next();
    }
}


//actualizar subareas
exports.actualizarSubArea=async(req, res, next) =>{
    try {
        await Subs.findByIdAndUpdate({_id: req.params.idSubArea}, req.body, {new: true});
        res.json({
           mensaje: 'SubArea actualizado correctamente'
       });
   } catch (error) {
       res.status(500).send({
           message:'Ocurrió un error'
       });
       res.send(error);
       next(error);
   }
}

//eliminar subareas
exports.eliminarSubArea=async(req, res, next) =>{
    try {
        await Subs.findByIdAndRemove({_id: req.params.idSubArea});
        res.json({
            mensaje: 'SubArea eliminado correctamente'
        });
    } catch (error) {
        res.status(500).send({
            message:'Ocurrió un error'
        });
        res.send(error);
        next(error);
    }
}