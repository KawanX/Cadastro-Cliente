const clienteDB = require('../../controller/SQL/db')
const seguranca = require("../components/seguranca")

async function selectCliente(){
    const conn = await clienteDB.connect();
    const [rows] = await conn.query('SELECT * FROM cliente;');
    return rows;
}

async function insertCliente(cliente){
    const conn = await clienteDB.connect();
    const sql = 'INSERT INTO cliente(nome, senha) VALUES (?,?);';
    const values = [cliente.nome, cliente.senha];
    return await conn.query(sql, values);
}

async function deleteCliente(id){
    const conn = await clienteDB.connect();
    const sql = 'DELETE FROM cliente where id=?;';
    return await conn.query(sql, [id]);
}

async function updateCliente(cliente){
    const conn = await clienteDB.connect();
    const sql = 'UPDATE cliente SET nome=?, senha=? where id=?;';
    const values = [cliente.nome, cliente.senha, cliente.id];
    return await conn.query(sql, values);
}

async function getClienteId(id){
    const conn = await clienteDB.connect();
    const sql = 'SELECT * FROM cliente where id=?;';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0) return rows[0];
    else return null;
}

async function login(nome, senha){
    const conn = await clienteDB.connect();
    const sql = 'SELECT * FROM cliente where nome=? and senha=?;';
    const values = [nome, seguranca.ocultarsenha(senha)];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0) return rows[0];
    else return null;
}

module.exports = {selectCliente, insertCliente, deleteCliente, updateCliente, getClienteId, login};
