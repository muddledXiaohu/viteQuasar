// * 登录
export namespace Login {
  export interface ReqLoginForm {
    jsonrpc: string;
    method: string;
    params: object;
    auth?: string;
    id: number;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [propName: string]: any;
  }
}
