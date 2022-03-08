import request from '@/utils/request'

// 获取产品列表
export function getProducts(params) {
  return request({
    url: '/products/all',
    method: 'get',
    params
  })
}
// 删除商品
export function deleteProduct(id){
  return request({
    url: `/products/${id}`,
    method: "delete"
  })
}
// 添加商品
export function addProduct(data){
  return request({
    url: "/products/add",
    method: "post",
    data
  })
}
// 查询某个产品详情
export function getProduct(id){
  return request({
    url: `/products/${id}`,
    method: "get"
  })
}
// 编辑产品
export function editProduct(data){
  return request({
    url: "/products/edit",
    method: "put",
    data
  })
}