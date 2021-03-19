import axios from 'axios'
const baseUrl = 'http://ht.slonger.net:8080/'
axios.defaults.timeout = 5000

//http request 拦截器
axios.interceptors.request.use(
  config => {

    config.headers = {

      'Content-Type': 'application/json;charset=utf-8',
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

      axios.get(baseUrl + url, {

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

    return new Promise((resolve, reject) => {

      axios.post(baseUrl + url, data)
        .then(response => {

          resolve(response.data)
        }, err => {

          reject(err)
        })
    })
  }
}