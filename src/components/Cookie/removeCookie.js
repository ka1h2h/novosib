import setCookie from "./setCookie"

function removeCookie(name) { 
  setCookie(name, "", {
    'max-age': -1
  })
  localStorage.removeItem('worker')  
}

export default removeCookie