import axios from 'axios'
import qs from 'qs'
const baseUrl = '/'
axios.defaults.timeout = 5000

//http request 拦截器
axios.interceptors.request.use(
  config => {

    config.headers = {

      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
  
      //'token': localStorage.getItem('token') // 获取token缓存
    }
    return config
  },
  error => {

    return Promise.reject(error)
  }
);

export default {

  /** * 封装get方法 * @param url * @param data * @returns {Promise} */
  get: function (url, params = {
  }) {

    return new Promise((resolve, reject) => {

      axios.get(url, {

        params: params
      })
        .then(response => {

          resolve(response.data)
        })
        .catch(err => {

          reject(err)
        })
    })
  },
  /** * 封装post请求 * @param url * @param data * @returns {Promise} */
  post: function (url, data) {
    data = qs.stringify(data)
    return new Promise((resolve, reject) => {

      axios.post(url, data)
        .then(response => {

          resolve(response.data)
        }, err => {

          reject(err)
        })
    })
  }
}