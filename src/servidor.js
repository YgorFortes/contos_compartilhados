import  express  from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();

const port = 3000;

//Buscando o caminho atual do projeto
const caminhoAtual = url.fileURLToPath(import.meta.url);

//Criando o diretorio para a paginas html
const diretorioPublico = path.join(caminhoAtual, "../..","./public");

//Colocando as paginas html em servidor de forma statica
app.use(express.static(diretorioPublico));

const servidorHttp =  http.createServer(app);


servidorHttp.listen(port, ()=>{
  console.log(`Servidor funcionando na porta http://localhost:${port}/`);
});


const io  = new Server(servidorHttp);




export default io;

