import { usuariosColecao } from "./dbConnect.js";
function encontrarUsuario(usuario){
  const resultado = usuariosColecao.findOne({usuario});
  return resultado;
}

function adicionarUsuario(usuario, senha){
  const usuarioSemEspaço = usuario.trim();
  const resultado = usuariosColecao.insertOne({usuario: usuarioSemEspaço, senha: senha});
  return resultado;
}

export {adicionarUsuario , encontrarUsuario}