import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/index/userInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
