import request from '@/utils/request'

export function addBook(data) {
  return request({
    url: '/books-manager/admin/book/add',
    method: 'post',
    data
  })
}

export function deleteBook(data) {
  return request({
    url: '/books-manager/admin/book/delete',
    method: 'post',
    data
  })
}

export function getUserList() {
  return request({
    url: '/books-manager/admin/user/list',
    method: 'get'
  })
}

export function updateUser(data) {
  return request({
    url: '/books-manager/admin/user/update',
    method: 'post',
    data
  })
}

export function updateBook(data) {
  return request({
    url: '/books-manager/admin/book/update',
    method: 'post',
    data
  })
}