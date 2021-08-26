import Axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus';
import qs from 'qs';

const axios = Axios.create({
  baseURL: '/api',
  timeout: 5000, // 请求超时 5s
});

let loading: any;
//正在请求的数量
let requestCount = 0

//显示loading
const showLoading = () => {
  if (requestCount === 0 && !loading) {
      loading = ElLoading.service({
          text: "Loading  ",
          background: 'rgba(0, 0, 0, 0.7)',
          spinner: 'el-icon-loading',
      })
  }
  requestCount++;
}
//隐藏loading
const hideLoading = () => {
  requestCount--;
  if (requestCount == 0) {
    loading.close();
    loading = undefined;
  }
}

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    showLoading();
    // 请求头携带Token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['token'] = token;
    }
    if (config.method == 'post') {
      config.data = qs.stringify(config.data);
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    hideLoading();
    const res = response.data;
    if (res.code !== 200) {
      ElMessage.error(res);
      if (res.code === 2000) {
        // 返回首页
      }
    };
    return res;
  },
  (error) => {
    hideLoading();
    if (error.response && error.response.data) {
      const code = error.response.status;
      const msg = error.response.data.message;
      ElMessage.error(`Code: ${code}, Message: ${msg}`);
      console.error(`[Axios Error]`, error.response);
    } else {
      ElMessage.error(`${error}`);
    }
    return Promise.reject(error);
  },
);

export default axios;
