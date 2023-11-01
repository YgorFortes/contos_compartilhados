import {aletarERedirecionarExclusao, atualizarEditorTexto, tratarAutorizacaoSucerro, atualizarInterfaceUsuario} from "./documentos.js"
import { obterCookie } from "../utils/cookies.js";
const socket = io('/usuarios',{
  auth: {
    token: obterCookie("jwtToken")
  }
});

function selecionarDocumento(dadosEntrada){
  socket.emit('selecionar_documento', dadosEntrada, (texto)=>{
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
});


socket.on('emitir_usuario_autorizado', tratarAutorizacaoSucerro);


socket.on('usuarios_no_documento', (usuariosDocumentos)=>{
  atualizarInterfaceUsuario(usuariosDocumentos)
})

socket.on('usuario_ja_na_documento', ()=>{
  alert('Documento já aberto em outra página')
  window.location.href = "/"
})



socket.on('connect_error', (erro)=>{
  alert(erro)
  window.location.href = "../login/index.html"
});





export  {emitirEditorTexto, selecionarDocumento, emitirExcluirDocumento}