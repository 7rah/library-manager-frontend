import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/books-manager/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/books-manager/user/register',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/books-manager/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/books-manager/user/logout',
    method: 'get'
  })
}

export function updateInfo(data) {
  return request({
    url: '/books-manager/user/update',
    method: 'post',
    data
  })
}

export function changePassword(data) {
  return request({
    url: '/books-manager/user/change_password',
    method: 'post',
    data
  })
}