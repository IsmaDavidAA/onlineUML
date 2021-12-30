const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const user = require('./User/user')

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

var dev_db_url = "mongodb+srv://GoUML:dbgouml@cluster0.aomqo.mongodb.net/GoUML?retryWrites=true&w=majority";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.post('/', (req, res)=> {
    const {username, password} = req.body;
    
    user.findOne({username}, (err, res) => {
        if(err){
            res.status(500).send('ERROR AL NO AUTENTIFICAR AL USUARIO');
        }else if(!user){
            res.status(500).send('EL USUARIO NO EXISTE');
        }else{
            user.isCorrectPassword(password, (err, result)=>{
                if(err){
                    res.status(500).send('ERROR AL AUTENTIFICAR');
                }else if(result){
                    res.status(500).send('USUARIO AUTENTIFICADO CORRECTAMENTE');
                }else{
                    res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA');
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('server started')
});

module.exports = app;