import Cookies from 'js-cookie'

/*
 * 获取cookies
 * */
export function getCookie(key) {
  return Cookies.get(key)
}
/*
 * 设置Cookies
 * */
export function setCookie(key, value, expiresTime, domain) {
  let seconds = expiresTime
  let expires = new Date(new Date() * 1 + seconds * 1000)
  return Cookies.set(key, value, { expires: expires, domain: domain })
}
/*
 * 移除Cookies
 * */
export function removeCookie(key) {
  return Cookies.remove(key)
}
