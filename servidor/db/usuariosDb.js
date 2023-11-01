import { usuariosColecao } from "./dbConnect.js";
import { ObjectId } from "mongodb";
function encontrarUsuario(usuario){
  const resultado = usuariosColecao.findOne({usuario});
  return resultado;
}

 function encontrarUsuarioPorId(id){

  const resultado =  usuariosColecao.findOne({_id: new ObjectId(id)});
  return resultado;
}

function adicionarUsuario(usuario, senha, saltSenha){
  const usuarioSemEspaço = usuario.trim();
  const resultado = usuariosColecao.insertOne({usuario: usuarioSemEspaço, senha: senha, saltSenha: saltSenha});
  return resultado;
}

export {adicionarUsuario , encontrarUsuario, encontrarUsuarioPorId}