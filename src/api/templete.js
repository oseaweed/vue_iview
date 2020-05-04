import axios from '@/libs/api.request'
export const getCatelogList = () => {
    const data = {
 
    }
    return axios.get({
      url:'/mock/getCatelogList',
      data
    })

  }