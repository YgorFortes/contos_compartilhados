import { emitirValoresCadastro } from "./socket-front-cadastro.js";
const formCadastro = document.getElementById('form-cadastro');

formCadastro.addEventListener('submit', (evento)=>{
evento.preventDefault();
 const dados = {
  usuario: formCadastro["input-usuario"].value,
  senha: formCadastro["input-senha"].value
 }

 emitirValoresCadastro(dados);

});