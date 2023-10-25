import io from "./servidor.js";
import { encontrarDocumento, atualizarDocumento, obterDocumentos, adicionarDocumento, excluirDocumento } from "./documentosDb.js";

io.on('connection',  (socket)=> {
  console.log(`O cliente se conectou id:${socket.id} `);

  socket.on('obter_documento', async (devolverDocumento)=>{
    const documentos = await obterDocumentos();
    devolverDocumento(documentos);
  });


  socket.on('selecionar_documento', async (nomeDocumento, devolverTexto)=>{

    //Procura o documento se encontrar emite um evento
    const documento =  await encontrarDocumento(nomeDocumento);
    console.log(documento)
    if(documento){
      devolverTexto(documento.texto);
    }

    //Criando salas pelo nome do documento
    socket.join(nomeDocumento);
  })

  socket.on('texto_editor',async(dados)=>{
    const {texto, nomeDocumento} = dados;

    const atualizacao = await atualizarDocumento(nomeDocumento, texto);
    console.log(atualizacao)
    if(atualizacao.modifiedCount){
      //Emitindo um evento
      socket.to(nomeDocumento).emit('texto_editor_clientes', texto);

    }
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

  socket.on('excluir_documento', async(nomeDocumento)=>{
    const resultado = await excluirDocumento(nomeDocumento);
    if(resultado.deletedCount){
      io.emit('excluir_documento_sucessso', nomeDocumento);;
    }
  })


  socket.on('disconnect', (motivo)=>{
    console.log(`Cliente id:${socket.id} desconectou. Motivo: ${motivo}`)
  })
});





