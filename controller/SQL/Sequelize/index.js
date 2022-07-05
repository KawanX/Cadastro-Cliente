(async () => {
  const database = require("./dborm");
  const { Cliente } = require("./cliente");

  console.log(" Criar tabela =======================================");
  const resultado = await database.sequelize.sync();

  console.log(resultado);

  console.log("Criar um registro ===================================");
  const inserirCliente = await Cliente.create({
    nome: "Kawan Ximendes de Lima",
    idade: 12,
    endereco: "Supermercado Pepe",
  });
  console.log(inserirCliente);

  console.log("Buscar um registro ===================================");
  const cliente = await Cliente.findByPk(1);
  console.log(cliente);

  console.log("Alterar um registro ==================================");
  const clienteAlterar = await Cliente.findByPk(1);
  clienteAlterar.nome = "Icaro Freitas";
  const resultadoSave = await clienteAlterar.save();
  console.log(resultadoSave);

  console.log("Buscar todos registro ================================");
  const clientes = await Clientes.findAll(1);
  console.log(clientes);

  console.log("Deletar o registro ===================================");
  const clienteDelete = await Cliente.findAll(1);
  clienteDelete.destroy();
})();

(async () => {
  const database = require("./dborm");
  const { Produto } = require("./produto");

  console.log(" Criar tabela =======================================");
  const resultado = await database.sequelize.sync();

  console.log(resultado);

  console.log("Criar um registro ===================================");
  const inserirProduto = await Produto.create({
    nome: "Livro",
    quantidade: 2,
    preco: "8.90",
  });
  console.log(inserirProduto);

  console.log("Buscar um registro ===================================");
  const produto = await Produto.findByPk(1);
  console.log(produto);

  console.log("Alterar um registro ==================================");
  const produtoAlterar = await Produto.findByPk(1);
  produtoAlterar.nome = "Marcador";
  const resultadoSave = await produtoAlterar.save();
  console.log(resultadoSave);

  console.log("Buscar todos registro ================================");
  const produto = await Produto.findAll(1);
  console.log(produto);

  console.log("Deletar o registro ===================================");
  const produtoDelete = await Produto.findAll(1);
  produtoDelete.destroy();
})();
