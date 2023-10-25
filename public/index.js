import "./socket-front-index.js"
import { emitrAdicionaDocumento } from "./socket-front-index.js";
const listarDocumentos = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const inputDocumento = document.getElementById('input-documento');


form.addEventListener('submit', (evento)=>{
  evento.preventDefault();
  emitrAdicionaDocumento(inputDocumento.value);
  inputDocumento.value = "";
});

function inserirLinkDocumento(nomeDocumento){
  listarDocumentos.innerHTML += `
      <a
        href="documento.html?nome=${nomeDocumento}"
        class="list-group-item list-group-item-action"
      >
        ${nomeDocumento}
      </a>
    `;
}


export {inserirLinkDocumento}