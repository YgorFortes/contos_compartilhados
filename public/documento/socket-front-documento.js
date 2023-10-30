import {aletarERedirecionarExclusao, atualizarEditorTexto,} from "./documentos.js"
const socket = io();

function selecionarDocumento(nome){
  socket.emit('selecionar_documento', nome, (texto)=>{
    atualizarEditorTexto(texto);
  });
}

function emitirEditorTexto(dados){
  socket.emit('texto_editor', dados);
}

//Escutando um evento do back
socket.on('texto_editor_clientes', (texto)=>{
  atualizarEditorTexto(texto);
});

function emitirExcluirDocumento(nome){
  socket.emit('excluir_documento', nome);
}

socket.on('excluir_documento_sucessso', (nome)=>{
  aletarERedirecionarExclusao(nome);
})




export  {emitirEditorTexto, selecionarDocumento, emitirExcluirDocumento}