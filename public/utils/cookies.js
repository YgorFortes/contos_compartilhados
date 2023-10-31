function definirCookie(chave, valor){
  document.cookie = `${chave}=${valor};path=/`;
  document.cookie = `${'chave'}=${'valor'};path=/`;
}


function obterCookie(chave){
  return document.cookie.split(";").find((cookie)=> cookie.trim().startsWith(`${chave}=`))?.split("=")[1];;
}

function excluirCookie(chave){
  document.cookie = `${chave}=; expires=Thu, 01 Jan 1970 00:00:00`;
}

export { definirCookie, obterCookie, excluirCookie };