import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import type { Router, RouteRecordRaw, RouteRecordNormalized } from 'vue-router';
import { useCounterStore } from "src/stores/modules/permission";


interface EssentialLinkProps {
  name: string;
  caption?: string;
  keepAlive?: string;
  icon?: string;
  children?: any;
}
import { basicRoutes } from './routers/index';

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(basicRoutes);

const essentialLinkData: EssentialLinkProps[] = [];
const getEssentialLink = (array: any[], data: any[], path?: string) => {
  array.forEach((item, idx) => {
    if (item.name && !item.meta.hideMenu && !item.meta.ignoreRoute) {
      data.push({
        name: item.name,
        caption: item.meta.title,
        icon: item.meta.icon,
        keepAlive: item.meta.keepAlive || false,
        url: path ? `${path}/${item.path}` : item.path,
        linkName: item.meta.name,
      })
      if (item.children) {
        data[data.length - 1].children = []
        getEssentialLink(item.children, data[data.length - 1].children, item.path);
      }
    }
  })
}
getEssentialLink(basicRoutes, essentialLinkData);
// setMenuLink

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

function createPageGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const appStore = useCounterStore();
    // if (!appStore.getToken) {
    //   next('/logon')
    // }
    const { matched, ...opt } = to;
    const matcheds = (matched
      ? matched.map((item) => ({
        meta: item.meta,
        name: item.name,
        path: item.path,
      }))
      : undefined) as RouteRecordNormalized[];
    // 面包屑
    appStore.setBreadcrumbs(matcheds)
    if (appStore.getMenuLink.length == 0) {
      appStore.setMenuLink(essentialLinkData)
    }
    if (to.meta.keepAlive) {
      const keepList = {
        name: to.name,
        caption: to.meta.title,
        keepAlive: to.meta.keepAlive,
        url: to.fullPath,
        icon: to.meta.icon,
        linkName: to.meta.name,
      }
      appStore.setTagView(keepList)
    }
    // token鉴权
    if (to.path === '/login') {
      next();
    }
    else {
      if (appStore.getToken) {
        next();
      } else {
        next('/login');
      }
    }
  });
}
let Router;
export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    // 应该添加到路由的初始路由列表。
    routes: basicRoutes as unknown as RouteRecordRaw[],

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  createPageGuard(Router)
  return Router;
});

export { Router };