import { inserirLinkDocumento } from "./index.js";
import { obterCookie } from "../utils/cookies.js";
const socket = io('/usuarios',{
  auth: {
    token: obterCookie("jwtToken")
  }
});

socket.emit('obter_documento', (documentos)=>{
  documentos.forEach((documento)=>{
    inserirLinkDocumento(documento.nome);
  });
});

function emitrAdicionaDocumento(nomeDocumento){
  socket.emit('adicionar_documento',nomeDocumento);
}

socket.on('adicionar_documento_interface',(nomeDocumento)=>{
  inserirLinkDocumento(nomeDocumento);
});

socket.on('documento_existente', (nomeDocumento)=>{
  alert(`O documento ${nomeDocumento} já existe!`);
});

socket.on('connect_error', (erro)=>{
  alert(erro)
  window.location.href = "./login/index.html"
});

export {emitrAdicionaDocumento}