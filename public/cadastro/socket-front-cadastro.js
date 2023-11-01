const socket = io();

function emitirValoresCadastro(dados){
  socket.emit('emitir_dados_cadastro', dados);
}

socket.on('emitir_cadastro_erro', ()=>{
  alert('Usuário já cadastrado com esse nome');
  window.location.href ="./index.html";
});

socket.on('emitir_cadastro_sucesso', ()=>{
  alert('Usuário cadastrado com sucesso!');
  window.location.href ="../login/index.html";
})
export {emitirValoresCadastro}