import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  // },
  {
    path: '/',
    redirect: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('pages/home/Index.vue'),
        meta: {
          keepAlive: true,
          title: 'Home'
        }
      },
      {
        path: '/git',
        name: 'Git',
        component: () => import('pages/home/Git.vue'),
        meta: {
          keepAlive: true,
          title: 'Git'
        }
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
