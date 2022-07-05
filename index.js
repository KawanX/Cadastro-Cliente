const express = require("express");

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')

var path = require('path');
app.set('views', path.join(__dirname, '/view/'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))

const passport = require('passport');
const session = require('express-session');
require('./model/components/autenticacao')(passport);

app.use(session({
    secret: '12345678',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000}
}))

app.use(passport.initialize());
app.use(passport.session());

app.post('/login/executar', passport.authenticate('local', {
    successRedirect: '/lista/usuario',
    failureRedirect: '/login/?fail=true'
}));

app.post('/login/cliente/executar', passport.authenticate('local', {
    successRedirect: '/lista/cliente',
    failureRedirect: '/.login/?fail=true'
}));
var consign = require('consign');
consign().include('controller/routes',).into(app);

app.use(express.static('view'));

app.listen(8082, function(){
    console.log("Servidor ativo. URL: http://localhost:8082");
});