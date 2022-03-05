import request from '@/utils/request'


export function getList() {
  return request({
    url: '/books-manager/table/list',
    method: 'get'
  })
}
