import axios from 'axios';
import qs from 'qs';
import { Message } from 'view-design'
import router from '@/router';
// 请求超时
axios.defaults.timeout = 10000;


// 请求拦截
axios.interceptors.request.use(config => {

  // 登录请求不设置token
  if (sessionStorage.getItem('token')) {
    // Bearer加空格！！！
    config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token')
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(function (response) {
  console.log(1111, response)
  // 200 --请求成功
  if (response.status === 200) {
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(response)
  }

}, function (error) {
  if (error.response.status) {
    switch (error.response.status) {
      // 401: 未登录
      case 401: { console.log('401') }
        router.replace("/login");
        break;

      // 403 token过期
      case 403:
        router.replace("/login");
        { console.log('403') }
        break;

      // 404请求不存在
      case 404:
        { Message.error('无效的请求'); }
        break;

      // 500 服务端错误
      case 500: {
        Message.error(error.response.data.data);
      }
        break;

      // 400 服务程序出错
      case 400:
        { Message.error('程序出错，请联系开发人员'); }
        break;

    }
    return Promise.reject(error.response);
  }

})

// 请求方式封装
class HttpRequest {
  constructor(baseUrl = baseURL) {
    // 设置baseurl
    axios.defaults.baseURL = baseUrl;

  }
  // get请求
  get(options) {
    return new Promise((resolve, reject) => {
      axios.get(options.url, {
        params: options.data
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err.data)
      })
    });
  }

  // post请求
  post(options) {
    return new Promise((resolve, reject) => {
      // const data = options.url.includes('login') ? qs.stringify(options.data) : options.data;
      const data = options.data;

      axios.post(options.url, data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err.data)
        })
    });
  }
  // delete请求
  delete(options) {
    return new Promise((resolve, reject) => {
      console.log(options.data)
      axios.delete(options.url + '/' + options.data, {})
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err.data)
        })
    });
  }
  // put请求
  put(options) {
    return new Promise((resolve, reject) => {
      axios.put(options.url, options.data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err.data)
        })
    });
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    return instance(options)
  }
}
export default HttpRequest
