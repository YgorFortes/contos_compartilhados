import { encontrarDocumento, atualizarDocumento, excluirDocumento } from "../db/documentosDb.js";
import { adicionarConexao, buscaNomeUsuariosDocumento, encontrarConexao, removerConexao } from "../utils/conexaoUsuarios.js";

function registrarEventosDocumentos (socket, io){
  socket.on('selecionar_documento', async (dadosEntrada, devolverTexto)=>{
    const {nomeDocumento, nomeUsuario} = dadosEntrada;
  
    //Procura o documento se encontrar emite um evento
    const documento =  await encontrarDocumento(nomeDocumento);
    if(documento){
      //Criando salas pelo nome do documento
      socket.join(nomeDocumento);

      const conexaoEncontrada = encontrarConexao(nomeDocumento, nomeUsuario);

      if(!conexaoEncontrada){
        adicionarConexao(nomeDocumento, nomeUsuario);

        socket.data = {
          usuariosEntrou: true
        }
        
        const usuariosDocumentos = buscaNomeUsuariosDocumento(nomeDocumento);

        io.to(nomeDocumento).emit('usuarios_no_documento', usuariosDocumentos);
        
        devolverTexto(documento.texto);
      }else{

        
        socket.emit('usuario_ja_na_documento');
      }

    }

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
      if(socket.data.usuariosEntrou){
        removerConexao(nomeDocumento, nomeUsuario);
  
        const usuariosDocumentos = buscaNomeUsuariosDocumento(nomeDocumento);
  
        io.to(nomeDocumento).emit('usuarios_no_documento', usuariosDocumentos);
        console.log(`Cliente id:${socket.id} desconectou. Motivo: ${motivo}`)
      }
      
  
    });

  });

 
}

export {registrarEventosDocumentos}