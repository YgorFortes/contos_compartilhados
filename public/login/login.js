import { emitirValoresLogin } from "./socket-login-front.js";
const formLogin = document.getElementById('form-login');

formLogin.addEventListener("submit", (evento)=>{

  evento.preventDefault();
  const dadosLogin ={
    nome: formLogin['input-usuario'].value,
    senha: formLogin['input-senha'].value
  }

  emitirValoresLogin(dadosLogin);
})