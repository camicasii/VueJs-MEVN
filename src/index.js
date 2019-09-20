const express =  require('express');
const app = express();

app.set('port', process.env.PORT||4000);
//Settings


//Middlewares


//Router

//Static file


app.use(express.static(__dirname +'/public'));

//Server Listening

app.listen(app.get('port'),()=>{
    console.log('Server on port:', app.get('port'));
    
})