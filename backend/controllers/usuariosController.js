const Usuarios= require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const token = require('../services/token');

// nuevo usuario
exports.nuevoUsuario=async(req, res, next) =>{
    const usuario= new Usuarios(req.body);
    try {
          
        //const usuario= new Usuarios(req.body);
        const salt=await bcrypt.genSalt(10);
        usuario.password= await bcrypt.hash(req.body.password, salt);
        await usuario.save();

            //firmar jwt
        // const payload={
        //        usuario:
        //        {
        //         id: usuario.id
        //        }
        // }
        // jwt.sign(payload, process.env.SECRETA, {
        //     expiresIn: 3600
        // }, (error, token) =>{
        //     if(error) throw error;

        //     res.json({token});
        // });



         res.json({
             mensaje: 'Usuario agregado correctamente'
         });
    } catch (error) {
        res.status(500).send({
            message:'Ocurrió un error'
        });
     //   res.send(error);
        next();
    }
}

//mostrar todos los usuario
exports.mostrarUsuarios=async(req, res, next) =>{
    try {
        const usuario= await Usuarios.find({});
        res.json(usuario);
    } catch (error) {
        res.status(500).send({
            message:'Ocurrió un error'
        });
        res.send(error);
        next();
    }
}



//actualizar usuario
exports.actualizarUsuario=async(req, res, next) =>{
    try {
        await Usuarios.findByIdAndUpdate({_id: req.params.idUsuario}, req.body, {new: true});
        res.json({
           mensaje: 'Usuario actualizado correctamente'
       });
   } catch (error) {
       res.status(500).send({
           message:'Ocurrió un error'
       });
       res.send(error);
       next();
   }
}


//eliminar usuario
exports.eliminarUsuario=async(req, res, next) =>{
    try {
        await Usuarios.findByIdAndRemove({_id: req.params.idUsuario});
        res.json({
            mensaje: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        res.status(500).send({
            message:'Ocurrió un error'
        });
        res.send(error);
        next();
    }
}


//eliminar usuario
exports.loginUsuario=async(req, res, next) =>{
    try {
       let user= await Usuarios.findOne({email: req.body.email});
       if (user){
            let match =await bcrypt.compare(req.body.password, user.password);
            if(match){
               // res.json('password correcto')
              // console.log(match);
               let tokenReturn = await token.encode(user._id, user.email, user.rol);
               //console.log(tokenReturn);
               res.status(200).json({user, tokenReturn});
            }
            else{
                res.status(404).send({message: 'Password Icorrecto'});
            }
       }
       else{
           res.status(404).send({message: 'Usuario no encontrado'});
       }
    } catch (error) {
        res.status(500).send({
            message:'Ocurrió un error'
        });
        res.send(error);
        next();
    }
}