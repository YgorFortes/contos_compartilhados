
const conexaoDocumentos = [];

function adicionarConexao(nomeDocumento, nomeUsuario){

  conexaoDocumentos.push({nomeDocumento, nomeUsuario});
  
}

function buscaNomeUsuariosDocumento(nomeDocumento){
  return conexaoDocumentos.filter((conexao)=> conexao.nomeDocumento === nomeDocumento)
  .map((conexao)=> conexao.nomeUsuario);
}

function encontrarConexao(nomeDocumento, nomeUsuario){
  return conexaoDocumentos.find((conexao)=> conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario)
}

function removerConexao(nomeDocumento, nomeUsuario){
  const index = conexaoDocumentos.findIndex((conexao)=> conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario);
  
  if(index !=-1){
    conexaoDocumentos.splice(index, 1);
  }
  console.log(conexaoDocumentos)
}



export {adicionarConexao, buscaNomeUsuariosDocumento, removerConexao , encontrarConexao}