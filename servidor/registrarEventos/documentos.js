import { encontrarDocumento, atualizarDocumento, excluirDocumento } from "../db/documentosDb.js";
import { adicionarConexao, buscaNomeUsuariosDocumento } from "../utils/conexaoUsuarios.js";

function registrarEventosDocumentos (socket, io){
  socket.on('selecionar_documento', async (dadosEntrada, devolverTexto)=>{
    const {nomeDocumento, nomeUsuario} = dadosEntrada;
    console.log(nomeUsuario)
    //Procura o documento se encontrar emite um evento
    const documento =  await encontrarDocumento(nomeDocumento);
    if(documento){
      //Criando salas pelo nome do documento
      socket.join(nomeDocumento);

      adicionarConexao(nomeDocumento, nomeUsuario);
      const usuariosDocumentos = buscaNomeUsuariosDocumento(nomeDocumento);
      io.to(nomeDocumento).emit('usuarios_no_documento', usuariosDocumentos);
      devolverTexto(documento.texto);
    }
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
    if(resultado.deletedCount){
      socket.emit('excluir_documento_sucessso', nomeDocumento);;
    }
  })

  socket.on('disconnect', (motivo)=>{
    console.log(`Cliente id:${socket.id} desconectou. Motivo: ${motivo}`)
  });
}

export {registrarEventosDocumentos}