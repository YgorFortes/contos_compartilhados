import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
function autenticarUsuario(senhaDigitada, usuario ){
  const hashTeste = scryptSync(senhaDigitada, usuario.saltSenha, 64);
  const hashReal = Buffer.from(usuario.senha, "hex");

  const resultado = timingSafeEqual(hashTeste, hashReal);
  return resultado;
}

export {autenticarUsuario}