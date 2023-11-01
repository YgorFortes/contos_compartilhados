import io from "./servidor.js";
import { registrarEventosCadastros } from "./registrarEventos/cadastro.js";
import { registrarEventosInicio } from "./registrarEventos/inicio.js";
import { registrarEventosDocumentos } from "./registrarEventos/documentos.js";
import { registrarEventosLogin } from "./registrarEventos/login.js";
import { atualizarUsuario } from "./middleware/autorizarUsuario.js";


const nspUsuarios = io.of('/usuarios');
nspUsuarios.use(atualizarUsuario);


nspUsuarios.on('connection',  (socket)=> {
  console.log(`O cliente se conectou id:${socket.id} `);
  registrarEventosInicio(socket, nspUsuarios);
  registrarEventosDocumentos(socket, nspUsuarios);


  socket.on('disconnect', (motivo)=>{
    console.log(`Cliente id:${socket.id} desconectou. Motivo: ${motivo}`)
  });
});

io.of('/').on('connection',  (socket)=> {
  console.log(`O cliente se conectou id:${socket.id} `);
  registrarEventosCadastros(socket, io);
  registrarEventosLogin(socket, io);

  socket.on('disconnect', (motivo)=>{
    console.log(`Cliente id:${socket.id} desconectou. Motivo: ${motivo}`)
  });
});





