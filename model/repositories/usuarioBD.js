const usuarioBD = require('./db');
const seguranca = require('../components/seguranca');
const usuario = require('../../controller/routes/usuario');

async function selectUsuario(){
    const conn = await usuarioBD.connect();
    const [rows] = await conn.query('SELECT * FROM usuario;');
    return rows;
}

async function getUsuario(id){
    const conn = await usuarioBD.connect();
    const sql = 'SELECT * FROM usuario WHERE id =?';
    const values = [id];
    const[rows] = await conn.query(sql,values);
    if(rows.lenght > 0)
      return rows[0];
    else return null;
}

async function login(nome, senha){
    const conn = await usuarioBD.connect();
    const sql = 'SELECT * FROM usuario WHERE nome = ? and senha=?';
    const values = [nome, seguranca.ocultarSenha(senha)];
    const [rows] = await conn.query(sql, values);
    if(rows.length>0)
       return rows;
    else return null;   
}

async function insertUsuario(usuario){
    const conn = await usuarioBD.connect();
    const sql = 'INSERT INTO usuario(nome, senha) VALUES (?,?)';
    const values = [usuario.nome, seguranca.ocultarSenha(usuario.senha)];
    return await conn.query(sql, values);
}

async function deleteUsuario(id){
    const conn = await usuarioBD.connect();
    const sql = 'DELETE FROM usuario where id=?;';
    return await conn.query(sql,[id]);
}

async function updateUsuario(){
    const conn = await usuarioBD.connect();
    const sql = 'UPDATE INTO (nome = ?, senha = ?) WHERE id = ?;';
    const values = [usuario.nome, senha.ocultarSenha(usuario.senha)];
    return await conn.query(sql, values);
}

module.exports = {selectUsuario,insertUsuario,deleteUsuario,updateUsuario,getUsuario,login};