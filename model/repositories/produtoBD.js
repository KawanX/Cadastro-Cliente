const produtoBD = require('../../controller/SQL/db');

async function selectProduto(){
    const conn = await produtoBD.connect();
    const [rows] = await conn.query('SELECT * FROM produto;');
    return rows;
}

async function insertProduto(produto){
    const conn = await produtoBD.connect();
    const sql = 'INSERT INTO produto(nome, quantidade, preco) VALUES (?,?,?);';
    const values = [produto.nome, produto.quantidade, produto.preco];
    return await conn.query(sql, values);
}

async function deleteProduto(id){
    const conn = await produtoBD.connect();
    const sql = 'DELETE FROM produto where id=?;';
    return await conn.query(sql, [id]);
}

async function updateProduto(produto){
    const conn = await produtoBD.connect();
    const sql = 'UPDATE produto SET nome=?, quantidade=?, preco=? where id=?;';
    const values = [produto.nome, produto.quantidade, produto.id];
    return await conn.query(sql, values);
}

async function getProdutoId(id){
    const conn = await produtoBD.connect();
    const sql = 'SELECT * FROM produto where id=?;';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0) return rows[0];
    else return null;
}


module.exports = {selectProduto, insertProduto, deleteProduto, updateProduto, getProdutoId};
