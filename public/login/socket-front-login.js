import { definirCookie } from "../utils/cookies.js";

const socket = io();

function emitirValoresLogin(dadosLogin){
  socket.emit('emitir_dados_login', dadosLogin);
}

socket.on('emitir_login_sucesso', (jwtToken)=>{
  alert('login feito com sucesso!');
  definirCookie("jwtToken", jwtToken);

  window.location.href ="/";
})

socket.on('emitir_login_falha', ()=>{
  alert('login não correspodem')
  window.location.href ="./index.html";
})

export {emitirValoresLogin}