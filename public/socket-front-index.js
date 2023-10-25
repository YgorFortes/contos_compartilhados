import { inserirLinkDocumento } from "./index.js";

const socket = io();

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
})

export {emitrAdicionaDocumento}