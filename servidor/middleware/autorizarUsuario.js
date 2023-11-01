import jwt from 'jsonwebtoken';
import { encontrarUsuarioPorId } from '../db/usuariosDb.js';
async function atualizarUsuario(socket, next){
  const secret = process.env.SECRET;
  const jwtToken = socket.handshake.auth.token;

  try {
    const resultado = jwt.verify(jwtToken, secret);
    const {id} = resultado;
    const usuario = await encontrarUsuarioPorId(id);
    const nomeUsuario = usuario.usuario;

    socket.emit('emitir_usuario_autorizado', nomeUsuario);
    next();
  } catch (erro) {
    next(erro);
  }


}

export { atualizarUsuario }