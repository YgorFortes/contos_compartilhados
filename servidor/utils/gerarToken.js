import 'dotenv/config';
import  jwt  from 'jsonwebtoken';
function gerarToken(payload){
  try {
    const secret = process.env.SECRET;

    const tokenJwt =  jwt.sign(payload, secret, {
      expiresIn: "1h"
    });

    return tokenJwt;
  } catch (erro) {
    console.log(erro);
  }
}

export {gerarToken}