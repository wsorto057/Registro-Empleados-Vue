const tokenService = require('../services/token');

exports.verificarUsuario= async(req, res, next) => {
    if(!req.headers.token){
        return res.status(404).send({
            message: 'No existee Token'
        });
    }
    const response=await tokenService.decode(req.headers.token);
    if(response.rol=='Admin' || response.rol=='Usuario'){
        next();
    }
    else{
        return res.status(403).send({
            message: 'No Autorizado'
        });
    }
    
},

exports.verificarUsuarioAdmin= async(req, res, next) => {
    if(!req.headers.token){
        return res.status(404).send({
            message: 'No existee Token'
        });
    }
    const response=await tokenService.decode(req.headers.token);
    if(response.rol=='Admin'){
        next();
    }
    else{
        return res.status(403).send({
            message: 'No Autorizado'
        });
    }
}