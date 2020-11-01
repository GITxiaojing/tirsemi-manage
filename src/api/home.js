import axios from '@/utils/request'

// 获取首页卡片数据
export function getDashboard() {
  return axios({
    url: '/admin/dashboard',
    method: 'get',
  })
}
