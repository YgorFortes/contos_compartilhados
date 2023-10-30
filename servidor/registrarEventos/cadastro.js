import { encontrarUsuario, adicionarUsuario } from "../db/usuariosDb.js";
import { criptografarSenha } from "../utils/criptografarSenha.js";

function registrarEventosCadastros(socket, io){
  socket.on('emitir_dados_cadastro', async (dados)=>{
    const {usuario, senha } = dados;
    const usuarioExiste = await encontrarUsuario(usuario, senha );
  
    if(usuarioExiste) {
      socket.emit('emitir_cadastro_erro');
    } else {
      const {saltSenha, hashSenha } = criptografarSenha(senha);
      const novoUsuario = await adicionarUsuario(usuario, hashSenha);

      if(novoUsuario.acknowledged){
        socket.emit('emitir_cadastro_sucesso');
      }
    }
   
  })
}

export {registrarEventosCadastros}