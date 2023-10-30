import { randomBytes, scryptSync } from "crypto";

function criptografarSenha (senha){
  const saltSenha = randomBytes(16).toString("hex");
  const hashSenha = scryptSync(senha, saltSenha, 64).toString("hex");
  return {saltSenha, hashSenha}
}

export {criptografarSenha}