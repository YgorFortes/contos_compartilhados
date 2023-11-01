import jwt from 'jsonwebtoken';
function atualizarUsuario(socket, next){
  const secret = process.env.SECRET;
  const jwtToken = socket.handshake.auth.token;

  try {
    jwt.verify(jwtToken, secret)
    next();
  } catch (erro) {
    next(erro);
  }


}

export { atualizarUsuario }