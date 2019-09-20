const express =  require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');



const app = express();
mongoose.connect('mongodb://localhost/mevn-database',{//conectanmos a la db si no existe la creamos
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db=>console.log('db is connected'))
    .catch(e=>console.error(e))

//Settings
app.set('port', process.env.PORT||4000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.raw());

//Router
app.use('/tasks',require('./routes/task'));
//Static file


app.use(express.static(__dirname +'/public'));

//Server Listening

app.listen(app.get('port'),()=>{
    console.log('Server on port:', app.get('port'));
    
})