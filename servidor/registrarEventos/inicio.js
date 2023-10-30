import { encontrarDocumento,  obterDocumentos, adicionarDocumento } from "../db/documentosDb.js";
function registrarEventosInicio(socket, io){
  socket.on('obter_documento', async (devolverDocumento)=>{
    const documentos = await obterDocumentos();
    devolverDocumento(documentos);
  });

  socket.on('adicionar_documento', async (nomeDocumento)=>{
    const documentoExiste =  await( encontrarDocumento(nomeDocumento)) !== null;
   
    if(documentoExiste){
      io.emit('documento_existente', nomeDocumento);
    }else{
      const documento = await adicionarDocumento(nomeDocumento);
      if(documento.acknowledged){
        io.emit('adicionar_documento_interface', nomeDocumento)
      }
    }
  });
}

export {registrarEventosInicio}