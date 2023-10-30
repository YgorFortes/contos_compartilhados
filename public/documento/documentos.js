import {emitirEditorTexto, emitirExcluirDocumento, selecionarDocumento} from './socket-front-documento.js'
const editorTexto = document.getElementById('editor-texto');
const botaoExcluir = document.getElementById('excluir-documento');


//Buscando nome do params da url
const parametro =  new URLSearchParams(window.location.search);
const nomeDocumento = parametro.get('nome');

//Mudando o titulo do documento para o nome do params
const tituloDocumento = document.getElementById('titulo-documento');
tituloDocumento.textContent = nomeDocumento;

selecionarDocumento(nomeDocumento);

//emitindo um evento pro back quando a tecla sobe no editor-texto
editorTexto.addEventListener('keyup', ()=>{
  const dados = {
    texto: editorTexto.value,
    nomeDocumento: nomeDocumento
  }
  emitirEditorTexto(dados);
});

function atualizarEditorTexto(texto){
  editorTexto.value = texto;
}

botaoExcluir.addEventListener('click', ()=>{
  emitirExcluirDocumento(nomeDocumento);
});

function aletarERedirecionarExclusao(nome){
  if(nome === nomeDocumento.trim()){
    alert(`O documento ${nomeDocumento} foi excluido com sucesso`);
    window.location.href = "/";
  }
}

export  {atualizarEditorTexto, aletarERedirecionarExclusao}

