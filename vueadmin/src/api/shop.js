import request from '@/utils/request'

export function categorylist(params) {
  return request({
    url: '/admin/category/categorylist',
    method: 'get',
    params
  })
}

export function delcategory(params) {
  return request({
    url: '/admin/category/delcategory',
    method: 'get',
    params
  })
}

export function addcategory(data) {
  return request({
    url: '/admin/category/addcategory',
    method: 'post',
    data: data
  })
}

export function editcategory(data) {
  return request({
    url: '/admin/category/editcategory',
    method: 'post',
    data: data
  })
}

export function productlist(params) {
  return request({
    url: '/admin/product/productlist',
    method: 'get',
    params
  })
}

export function delproduct(params) {
  return request({
    url: '/admin/product/delproduct',
    method: 'get',
    params
  })
}

export function addProduct(data) {
  return request({
    url: '/admin/product/addProduct',
    method: 'post',
    data: data
  })
}

export function editProduct(data) {
  return request({
    url: '/admin/product/editProduct',
    method: 'post',
    data: data
  })
}
