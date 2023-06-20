import { Login } from "./interface";
// import qs from "qs";
import { axiosMan } from 'boot/axios'
/**
 * @name 登录模块
 */
// * 用户登录接口
export const zabbixApi = (params: Login.ReqLoginForm) => {
  return axiosMan.post<Login.ResLogin>(`/api_jsonrpc.php`, params);
};
