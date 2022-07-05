const produtoBanco = require('../../model/repositories/produtoBD');

module.exports = function (app){

    app.get("/", function(req, resp){
        resp.send("<h1>Bem-vindo ao meu app</h1>");
    })
   
    app.get('/.cadastro', function (req, res){
        if(req.query.fail) 
            res.render('produto/CadastroProduto', {mensagem: 'Cadastro'});
        else
            res.render('produto/CadastroProduto', {mensagem: null});

    })

    app.post('/cadastro/produto/edit/salvar', (req, res) => {
        var produto = { 
            nome: req.body.nome,
            quantidade: req.body.quantidade,
            preco: req.body.preco,
            id: req.body.id
        };
        try {
            produtoBanco.updateProduto(produto);
            res.render('produto/Sucesso', {mensagem: 'alterado'});
        } catch (error){
            res.render('produto/EditProduto', {title: 'Edição Cadastro', mensagem: "Erro no cadastro"})
        }
    })

    app.post('/cadastro/produto/salvar', (req, res) => {
        try {
            var produto = {nome: req.body.nome,
                           quantidade: req.body.quantidade,
                            preco: req.body.preco}
            produtoBanco.insertProduto(produto);
            res.render('produto/Sucesso', {mensagem: 'cadastrado'});
        } catch (error){
            res.render('produto/CadastroProduto', { title: 'Cadastro', mensagem: "Erro no cadastro"})
        }
    })

    app.get('/lista/produto', async (req, res, next) => {
        try{
            const docs = await produtoBanco.selectProduto();
            res.render('produto/Lista', { mensagem: 'Lista de Produto', docs });
        } catch (err){
            next(err);
        }
    });

    app.get('/delete/produto/:id', async (req, res, next) => {
        try{
            var id = req.params.id;
            await produtoBanco.deleteProduto(id);
            const docs = await produtoBanco.selectProduto();
            res.render('produto/Lista', { mensagem: 'Usuário excluído com sucesso', docs });
        } catch (err){
            next(err);
        }
    });

    app.get('/edit/produto/:id', async (req, res, next) => {
        try{
            var id = req.params.id;
            const produto = await produtoBanco.getProdutoId(id);
            res.render('produto/EditProduto', { mensagem: '', produto });
        } catch (err){
            next(err);
        }
    });


}