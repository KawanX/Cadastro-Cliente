const express = require("express");

const app = express();

app.get("/",function(req, resp){
    resp.send("Bem vindo ao meu app");
});

app.get("/contato",function(req,resp){
    resp.send("Pagina de contato do meu app");
});

app.get("/produto",function(req,resp){
    resp.send("Pagina de produtos do meu app");
});

app.get("/dados/:nome/:cargo",function(req,resp){
    resp.send("<h1>Ola sr(a).: "+req.params.nome+"</h1><h2>Seu cargo e:"+req.params.cargo+"</h2>");
});

app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');
var path = require('path');
app.set('views',path.join(__dirname,'/view/'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var consign = require('consign');
consign().include('../controller/routes', ).into(app);

app.listen(8080, function(){
    console.log("Servidor funcionando na url http://localhost:8082");
});