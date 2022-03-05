import request from '@/utils/request'

export function getList() {
  return request({
    url: '/books-manager/book/list',
    method: 'get',
  })
}

export function getSearchList(data) {
    return request({
      url: '/books-manager/book/search',
      method: 'post',
      data
    })
}

export function borrow(data) {
  return request({
    url: '/books-manager/book/borrow',
    method: 'post',
    data
  })
}

export function returnBook(data) {
  return request({
    url: '/books-manager/book/return',
    method: 'post',
    data
  })
}

export function getBorrowedBook() {
  return request({
    url: '/books-manager/book/list_borrow',
    method: 'get',
  })
}

export function getReturnBook() {
  return request({
    url: '/books-manager/book/list_return',
    method: 'get',
  })
}

