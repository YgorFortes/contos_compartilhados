import io from "./servidor.js";
import { registrarEventosCadastros } from "./registrarEventos/cadastro.js";
import { registrarEventosInicio } from "./registrarEventos/inicio.js";
import { registrarEventosDocumentos } from "./registrarEventos/documentos.js";


io.on('connection',  (socket)=> {
  console.log(`O cliente se conectou id:${socket.id} `);
  registrarEventosInicio(socket, io);
  registrarEventosDocumentos(socket, io);
  registrarEventosCadastros(socket, io);

  socket.on('disconnect', (motivo)=>{
    console.log(`Cliente id:${socket.id} desconectou. Motivo: ${motivo}`)
  });
});





