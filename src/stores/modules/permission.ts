import { defineStore } from 'pinia';
import { Menu, MenuModule } from 'src/router/types';
import type { RouteRecordNormalized } from 'vue-router';
import { Router as router } from "src/router/index";
interface PermissionState {
    keepAliveList: string[];
    tagView: Menu[];
    breadcrumbs: RouteRecordNormalized[];
    menuLink: MenuModule[];
    token: string;
    locale: string;
}
export const useCounterStore = defineStore({
    id: 'app-user',
    state: (): PermissionState => ({
        // 缓存路由名
        keepAliveList: ['Home'],
        // tabs列表
        tagView: [],
        // 面包屑
        breadcrumbs: [],
        // 左侧菜单列表
        menuLink: [],
        // token
        token: localStorage.getItem('token') || '',
        locale: localStorage.getItem('language') || 'zh-CN'
    }),
    getters: {
        getKeepAliveList(): string[] {
            return this.keepAliveList;
        },
        getTagView(): Menu[] {
            return this.tagView;
        },
        getBreadcrumbs(): RouteRecordNormalized[] {
            return this.breadcrumbs;
        },
        getToken(): string {
            return this.token;
        },
        getLocale(): string {
            return this.locale;
        },
        getMenuLink(): MenuModule[] {
            return this.menuLink;
        },
    },
    actions: {
        /**
         * Set cache list according to tagView
         * @param payload tagView[]
         */
        setKeepAliveList(payload: string[]) {
            this.keepAliveList = [...['Home'], ...payload];
        },
        setBreadcrumbs(payload: RouteRecordNormalized[]) {
            this.breadcrumbs = payload;
        },
        setTagView(payload: Menu) {
            if (payload && payload.name !== 'Home' && !this.tagView.some(item => item.name == payload.name)) {
                const dt = [payload]
                this.tagView = [...this.tagView, ...dt]
                const data = this.tagView.map(item => { return item.name })
                this.setKeepAliveList(data)
            }
        },
        setToken(payload: string) {
            this.token = payload;
            localStorage.setItem("token", payload);
        },
        setLocale(payload: string) {
            this.locale = payload;
        },
        setMenuLink(payload: MenuModule[]) {
            this.menuLink = payload;
        },
        removeTagView(payload: number) {
            const { push } = router;
            switch (typeof payload) {
                case 'undefined':
                    console.log(1);
                    break
                case 'object':
                    console.log(2);
                    break
                default:
                    const removedTagView = this.tagView[payload]?.url || ''
                    this.tagView.splice(payload, 1)
                    if (this.tagView.length === 0) {
                        this.setKeepAliveList([])
                        push('/')
                    } else {
                        const data = this.tagView.map(item => { return item.name })
                        this.setKeepAliveList(data)
                        if (this.tagView.length === payload && window.location.href.indexOf(removedTagView) !== -1) {
                            push(this.tagView[payload - 1].url || '/')
                            return
                        }
                        if (payload === 0 && window.location.href.indexOf(removedTagView) !== -1) {
                            push(this.tagView[0].url || '/')
                            return
                        }
                        if (window.location.href.indexOf(removedTagView) !== -1) {
                            push(this.tagView[payload - 1].url || '/')
                        }
                    }
                    break
            }
        },
    },
});
