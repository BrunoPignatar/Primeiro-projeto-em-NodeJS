const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/post');
const { where } = require("sequelize");

// Config
  // Template Engine
  app.engine('handlebars', handlebars.engine({defaultLayout: 'main',  runtimeOptions: {
    allowProtoPropertiesByDefault: true,

    allowProtoMethodsByDefault: true,
}}));
  app.set('view engine', 'handlebars');
    // Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
// Rotas
    app.get('/', function(req, res){
        Post.findAll().then(function(posts){
            console.log(posts)
            res.render('home', {posts: posts})
        })
        
    })

   app.get('/cad', function(req, res){
    res.render('formulario')
   })

   app.post('/add', function(req,res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send("Erro ao criar post" + erro)
    })
   })

   app.get('/deletar/:id', function(req,res) {
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Postagem deletada com sucesso")

    }).catch(function(erro){
        res.send("A postagem não foi deletada" + erro)

    })
   })


app.listen(8081, function(){
    console.log("servidor rodando na url http://localhost:8081");
});