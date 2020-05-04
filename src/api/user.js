import axios from '@/libs/api.request'
export const login = ({ username, password }) => {
    const data = {
      username,
      password,
    }
    return axios.post({
      url:'login',
      data
    })

  }