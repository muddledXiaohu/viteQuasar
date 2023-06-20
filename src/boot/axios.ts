import { boot } from 'quasar/wrappers';
import { ResultEnum } from "./http/httpEnum";
import { checkStatus } from "./http/checkStatus";
import { Notify } from 'quasar'
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCounterStore } from "src/stores/modules/permission";
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({ baseURL: process.env.VITE_GLOB_API_URL });
// const api = axios.create({ baseURL: process.env.VITE_API_URL });


const defaults = {
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间（4s）
  timeout: 4000,
  // 跨域时候允许携带凭证
  withCredentials: true
};


class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token: string = useCounterStore().getToken;
        return { ...config, headers: { ...config.headers, "x-access-token": token } };
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        // * 登录失效
        if (data.code == ResultEnum.OVERDUE) {
          // store.dispatch(setToken(""));
          Notify.create({
            message: data.msg
          })
          window.location.hash = "/login";
          return Promise.reject(data);
        }
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          Notify.create({
            message: data.msg
          })
          return Promise.reject(data);
        }
        // * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        // 请求超时单独判断，请求超时没有 response
        if (error.message.indexOf("timeout") !== -1) Notify.create({ message: "请求超时，请稍后再试" })
        // 根据响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status);
        // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) window.location.hash = "/500";
        return Promise.reject(error);
      }
    );
  }
  get<T = any>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.get(url, { params, ..._object });
  }
  post<T = any>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.post(url, params, _object);
  }
  put<T = any>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.put(url, params, _object);
  }
  delete<T = any>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.delete(url, { params, ..._object });
  }
}
const axiosMan = new RequestHttp(defaults);
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axiosMan;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axiosMan }