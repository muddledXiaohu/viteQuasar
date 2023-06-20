import type { AppRouteRecordRaw, AppRouteModule } from 'src/router/types';
// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: AppRouteModule[] = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});


// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  redirect: '/start',
  name: 'Root',
  meta: {
    title: 'Root',
    hideMenu: true
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('pages/login/Login.vue'),
  meta: {
    title: 'login',
    hideMenu: true
  },
};
export const HomeRoute: AppRouteRecordRaw = {
  path: '/start',
  component: () => import('layouts/MainLayout.vue'),
  name: 'Start',
  meta: {
    title: 'layout.routerName.fastStart.name',
    name: 'layout.routerName.fastStart.name',
    icon: 'design_services',
  },
  redirect: '/start/home',
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('pages/home/Index.vue'),
      meta: {
        keepAlive: true,
        name: 'layout.routerName.fastStart.home.name',
        title: 'layout.routerName.fastStart.home.title',
        icon: 'tune',
      }
    },
    {
      path: 'overview',
      name: 'Overview',
      component: () => import('pages/Overview/Index.vue'),
      meta: {
        keepAlive: true,
        name: 'layout.routerName.overview.overview.name',
        title: 'layout.routerName.overview.overview.title',
        icon: 'tune',
      }
    },
    {
      path: 'monitor',
      name: 'Monitor',
      component: () => import('pages/home/Monitor.vue'),
      meta: {
        keepAlive: true,
        name: 'layout.routerName.fastStart.monitor.name',
        title: 'layout.routerName.fastStart.monitor.title',
        icon: 'code'
      }
    },
    {
      path: 'serverDetails',
      name: 'serverDetails',
      component: () => import('pages/serverDetails/Index.vue'),
      meta: {
        name: 'layout.routerName.overview.overview.sonName',
        ignoreRoute: true
      }
    },
  ],
};
export const errorNotFound = {
  path: '/:catchAll(.*)*',
  component: () => import('pages/ErrorNotFound.vue'),
}
// 未经许可的基本路由
export const basicRoutes = [
  errorNotFound,
  HomeRoute,
  LoginRoute,
  RootRoute,
  ...routeModuleList
];