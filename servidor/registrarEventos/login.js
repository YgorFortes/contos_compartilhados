import { encontrarUsuario } from "../db/usuariosDb.js";
import { autenticarUsuario } from "../utils/autenticarUsuarios.js";
import { gerarToken } from "../utils/gerarToken.js";

function registrarEventosLogin(socket, io){
  socket.on('emitir_dados_login', async (dados)=>{
    const {nome, senha} = dados;
    const usuario = await encontrarUsuario(nome);

    if(usuario){
      const resultado = autenticarUsuario(senha, usuario);
      if(resultado){
        const jwtToken = gerarToken({id: usuario._id});
  
        socket.emit('emitir_login_sucesso', jwtToken);
      }else {
        socket.emit('emitir_login_falha');
      }
    }
  });
}

export {registrarEventosLogin}