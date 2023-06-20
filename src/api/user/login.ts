import { Login } from "./interface";
// import qs from "qs";
import { axiosMan } from 'boot/axios'
/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
  return axiosMan.post<Login.ResLogin>(`/api_jsonrpc.php`, params);
  // return axiosMan.post<Login.ResLogin>(`/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
  // return axiosMan.post<Login.ResLogin>(`/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
  // return axiosMan.post<Login.ResLogin>(`/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};
