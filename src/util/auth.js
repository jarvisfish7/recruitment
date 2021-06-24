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
  return cookies.remove("userid")
  return cookies.remove("companyid");
}
export function getUserName(){
  return cookies.get("username");
}
export function setUserName(username){
  return cookies.set("username",username);
}
export function getUserId(){
  return cookies.get("userid");
}
export function setUserId(userid){
  return cookies.set("userid",userid);
}

export function getCompanyId(){
  return cookies.get("companyid");
}
export function setCompanyId(companyid){
  return cookies.set("companyid",companyid);
}


