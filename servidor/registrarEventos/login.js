import { encontrarUsuario } from "../db/usuariosDb.js";
import { autenticarUsuario } from "../utils/autenticarUsuarios.js";

function registrarEventosLogin(socket, io){
  socket.on('emitir_dados_login', async (dados)=>{
    const {nome, senha} = dados;
    const usuario = await encontrarUsuario(nome);

    if(usuario){
      const resultado = autenticarUsuario(senha, usuario);
      if(resultado){
        socket.emit('emitir_login_sucesso');
      }else {
        socket.emit('emitir_login_falha');
      }
    }
  });
}

export {registrarEventosLogin}