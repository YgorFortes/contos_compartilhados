import { MongoClient } from "mongodb";
import 'dotenv/config';

const stringConexao = process.env.STRINGCONECAO;

const cliente = new MongoClient(stringConexao);
let documentosColecao;


try {
  await cliente.connect();
  const db =   cliente.db('documentos');
  documentosColecao = db.collection('documentos');

  console.log('Servidor conectado ao banco de dados');
} catch (erro) {
  console.log(erro);
}

export  {documentosColecao};