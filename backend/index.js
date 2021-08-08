const express= require('express');
const routes= require('./routes/index');
const app =express();
const mongoose= require('mongoose');
const bodyparser= require('body-parser');
const cors= require('cors');

require('./database')

app.use(cors());
app.use(bodyparser.urlencoded({ extended:true }));
app.use(bodyparser.json());

//rutas
app.use('/', routes());


app.set('PORT', process.env.PORT || 4000);

app.listen(app.get('PORT'), ()=> {
    console.log('servidor escuchando por el puerto: ', app.get('PORT'));
});