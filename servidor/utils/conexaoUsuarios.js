const conexaoDocumentos = [];

function adicionarConexao(nomeDocumento, nomeUsuario){
  conexaoDocumentos.push({nomeDocumento, nomeUsuario});
}

function buscaNomeUsuariosDocumento(nomeDocumento){
  return conexaoDocumentos.filter((conexao)=> conexao.nomeDocumento === nomeDocumento)
  .map((conexao)=> conexao.nomeUsuario);
}

export {adicionarConexao, buscaNomeUsuariosDocumento}