const Usuarios= require('../models/Usuarios');
const jwt=require('jsonwebtoken');

//si token ya espiro
async function checkToken(token){
    let __id=null;
    try {
        const{_id}=await jwt.decode(token);
        __id = _id;
    } catch (error) {
        return false;
    }
    const user= await Usuarios.findOne({_id: __id});
    if(user){
        const token= jwt.sign({_id: __id}, 'CLAVESECRETA',{expiresIn: '1h'})
        return {token}
    }
    else{
        return false;
    }
}



exports.encode=async(_id, email, rol) =>{
    const token= jwt.sign({_id: _id, email: email, rol: rol}, 'CLAVESECRETA', {expiresIn: '1h'});
    return token;
}

exports.decode=async(token) =>{
    try {
        const {_id}=await jwt.verify(token,'CLAVESECRETA');
        const user=await Usuarios.findOne({_id});
        if(user){
            return user;
        }
        else{
            return false;
        }
    } catch (error) {
        const newToken=await checkToken(token);
        return newToken;
    }
}