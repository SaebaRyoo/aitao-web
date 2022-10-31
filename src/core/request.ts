import axios from 'axios';

// const { REACT_APP_ENV } = process.env;
const config: any = {
  // baseURL: 'http://127.0.0.1:8001',
  timeout: 30 * 1000,
  headers: {},
};

// 构建实例
const instance = axios.create(config);

// axios方法映射
const InstanceMaper = {
  get: instance.get,
  post: instance.post,
  delete: instance.delete,
  put: instance.put,
  patch: instance.patch,
};

const request = (
  url: string,
  opts: {
    method: 'get' | 'post' | 'delete' | 'put' | 'patch';
    [key: string]: any;
  }
) => {
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      if (opts.auth) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.headers.satoken = localStorage.getItem('satoken');
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      console.log('response:', response);

      // http状态码
      if (response.status !== 200) {
        console.log('网络请求错误');
        return Promise.reject(response.data);
      }

      // 后端返回的状态，表示请求成功
      if (response.data.success) {
        console.log(response.data.message);

        return response.data.data;
      }

      return response;
    },
    function (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // jumpLogin();
        }
      }
      return Promise.reject(error);
    }
  );

  const method = opts.method;
  return InstanceMaper[method](url, opts.data);
};

export default request;
