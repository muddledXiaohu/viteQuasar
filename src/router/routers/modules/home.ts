import type { AppRouteModule } from 'src/router/types';
const dashboard: AppRouteModule = {
  path: '/demo',
  component: () => import('layouts/MainLayout.vue'),
  name: 'Demo',
  meta: {
    title: 'layout.routerName.demo.name',
    name: 'layout.routerName.demo.name',
    icon: 'design_services',
  },
  redirect: '/demo/git',
  children: [
    {
      path: 'git',
      name: 'Git',
      component: () => import('pages/home/Git.vue'),
      meta: {
        keepAlive: true,
        name: 'layout.routerName.demo.demo.name',
        title: 'layout.routerName.demo.demo.title',
        icon: 'code'
      }
    },
    {
      path: 'demo',
      name: 'Demo',
      component: () => import('pages/demo/Index.tsx'),
      meta: {
        keepAlive: true,
        name: 'layout.routerName.demo.demo.name',
        title: 'layout.routerName.demo.demo.title',
        icon: 'code'
      }
    },
  ],
};

export default dashboard;