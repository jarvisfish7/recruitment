import cookies from  'vue-cookies'

export function getToken(){
  return cookies.get("token");
}
export function setToken(token){
  return cookies.set("token",token);
}
export function removeAll(){
  return cookies.remove("token");
  return cookies.remove("username");
}
export function getUserName(){
  return cookies.get("username");
}
export function setUserName(username){
  return cookies.set("username",username);
}
