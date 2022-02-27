import request from '@/utils/request'

export function getCategory(params) {
  return request({
    url: '/category/all',
    method: 'get',
    params
  })
}