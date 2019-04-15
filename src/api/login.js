import request from '@/utils/request'
const frontType = '0' // web 标识
export function login(userName, userPwd) {
  return request({
    url: '/manager/login',
    method: 'post',
    data: {
      userName,
      userPwd,
      frontType
    }
  })
}

export function getInfo() {
  return request({
    url: '/manager/getlogin',
    method: 'post',
    data: { frontType }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
