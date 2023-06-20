import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { defineComponent } from 'vue';
export type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string;
    meta: RouteMeta;
    component?: Component | string;
    components?: Component;
    children?: AppRouteRecordRaw[];
    fullPath?: string;
}
export interface Menu {
    name: string;
    caption?: string;
    keepAlive?: boolean;
    url?: string;
    icon?: string;
    children?: any;
    linkName?: any;
}

export interface MenuModule {
    name: string;
    url?: string;
    caption?: string;
    keepAlive?: string;
    icon?: string;
    children?: any;
}
// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw;