import "./socket-front-index.js"
import { emitrAdicionaDocumento } from "./socket-front-index.js";
import { excluirCookie, obterCookie } from "./utils/cookies.js";
const listarDocumentos = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const inputDocumento = document.getElementById('input-documento');
const botaoLogout = document.getElementById('botao-logout');




form.addEventListener('submit', (evento)=>{
  evento.preventDefault();
  emitrAdicionaDocumento(inputDocumento.value);
  inputDocumento.value = "";
});

function inserirLinkDocumento(nomeDocumento){
  listarDocumentos.innerHTML += `
      <a
        href="./documento/documento.html?nome=${nomeDocumento}"
        class="list-group-item list-group-item-action"
      >
        ${nomeDocumento}
      </a>
    `;
}

botaoLogout.addEventListener("click",(evento)=>{
  evento.preventDefault();
  excluirCookie("jwtToken");
  alert('Deslogado com sucesso');
  window.location.href ="./login/index.html";
})

export {inserirLinkDocumento}