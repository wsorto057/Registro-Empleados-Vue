const mongoose = require('mongoose');
//URI=('mongodb://localhost/dbempleados');
mongoose.Promise = global.Promise;
URI=('mongodb+srv://empleados_admin:empleados123@cluster0.nhvdo.mongodb.net/empleados-db?retryWrites=true&w=majority');

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false

})
.then(db=>console.log('conexion establecida correctamente'))
.catch(error => console.log(error))

module.exports = mongoose;