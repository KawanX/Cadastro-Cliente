const seguranca = require('../../model/components/seguranca')
const clienteBanco = require('../../model/repositories/clienteDB')

module.exports = function (app){

    app.get("/", function(req, resp){
        resp.send("<h1>Bem-vindo ao meu app</h1>");
    })
   
    app.get('/..cadastro', function (req, res){
        if(req.query.fail) 
            res.render('cliente/CadastroCliente', {mensagem: 'Cadastro'});
        else
            res.render('cliente/CadastroCliente', {mensagem: null});

    })

    app.post('/cadastro/cliente/edit/salvar', (req, res) => {
        var cliente = { 
            nome: req.body.nome,
            senha: req.body.senha,
            id: req.body.id
        };
        try {
            clienteBanco.updateCliente(cliente);
            res.render('cliente/Sucesso', {mensagem: 'alterado'});
        } catch (error){
            res.render('cliente/EditCliente', {title: 'Edição Cadastro', mensagem: "Erro no cadastro"})
        }
    })

    app.post('/cadastro/cliente/salvar', seguranca.autenticar, (req, res) => {
        try {
            var cliente = {nome: req.body.nome,
                           senha: seguranca.ocultarsenha(req.body.senha)}
            clienteBanco.insertCliente(cliente);
            res.render('cliente/Sucesso', {mensagem: 'cadastrado'});
        } catch (error){
            res.render('cliente/CadastroCliente', { title: 'Cadastro', mensagem: "Erro no cadastro"})
        }
    })

    app.get('/lista/cliente', seguranca.autenticar, async (req, res, next) => {
        try{
            const docs = await cliente.selectCliente();
            res.render('cliente/Lista', { mensagem: 'Lista de Usuário', docs });
        } catch (err){
            next(err);
        }
    });

    app.get('/delete/cliente/:id', seguranca.autenticar, async (req, res, next) => {
        try{
            var id = req.params.id;
            await clienteBanco.deleteCliente(id);
            const docs = await cliente.selectCliente();
            res.render('cliente/Lista', { mensagem: 'Usuário excluído com sucesso', docs });
        } catch (err){
            next(err);
        }
    });

    app.get('/edit/cliente/:id', seguranca.autenticar, async (req, res, next) => {
        try{
            var id = req.params.id;
            const cliente = await cliente.getClienteId(id);
            res.render('cliente/EditCliente', { mensagem: '', cliente });
        } catch (err){
            next(err);
        }
    });

    app.get('/.login', function (req, res) {
        if(req.query.fail) res.render('cliente/Login', { mensagemLogin: 'Usúario e/ou senha incorretos!'});
        else res.render('cliente/Login', { mensagemLogin: null});
    });

}