import { encontrarDocumento, atualizarDocumento, excluirDocumento } from "../db/documentosDb.js";

function registrarEventosDocumentos (socket, io){
  socket.on('selecionar_documento', async (nomeDocumento, devolverTexto)=>{

    //Procura o documento se encontrar emite um evento
    const documento =  await encontrarDocumento(nomeDocumento);
    console.log(documento)
    if(documento){
      devolverTexto(documento.texto);
    }

    //Criando salas pelo nome do documento
    socket.join(nomeDocumento);
  });


  socket.on('texto_editor',async(dados)=>{
    const {texto, nomeDocumento} = dados;
    const atualizacao = await atualizarDocumento(nomeDocumento, texto);
    if(atualizacao.modifiedCount){
      //Emitindo um evento
      socket.to(nomeDocumento).emit('texto_editor_clientes', texto);

    }
  });

 
  socket.on('excluir_documento', async(nomeDocumento)=>{
    const resultado = await excluirDocumento(nomeDocumento);
    console.log(resultado)
    if(resultado.deletedCount){
      socket.emit('excluir_documento_sucessso', nomeDocumento);;
    }
  })
}

export {registrarEventosDocumentos}