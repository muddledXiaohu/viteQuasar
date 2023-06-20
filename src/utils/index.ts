
import { cloneDeep } from 'lodash-es';
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}
// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  const res: any = cloneDeep(src);
  for (key in target) {
    res[key] = isObject(res[key]) ? deepMerge(res[key], target[key]) : (res[key] = target[key]);
  }
  return res;
}