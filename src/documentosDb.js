import { documentosColecao } from "./dbConnect.js";

function obterDocumentos(){
  const documentos = documentosColecao.find().toArray();
  return documentos;
}

function encontrarDocumento(nome){
  const resultado = documentosColecao.findOne({nome: nome});
  return resultado;
}

function adicionarDocumento(nome){
  const nomeSemEspaco = nome.trim();
  const resultado = documentosColecao.insertOne({nome: nomeSemEspaco, texto: ""});
  return resultado;
}

function atualizarDocumento(nome, texto){
  const resultado = documentosColecao.updateOne({nome: nome}, {$set: {texto: texto}});
  return resultado;
}

function excluirDocumento(nome){
  const nomeSemEspaco = nome.trim();
  const resultado = documentosColecao.deleteOne({nome: nomeSemEspaco});
  return resultado;
}

export {encontrarDocumento, atualizarDocumento, obterDocumentos, adicionarDocumento, excluirDocumento}
