<script setup lang="ts">
import { ref, computed, watch } from "vue";
import EssentialLink, { EssentialLinkProps } from "components/EssentialLink.vue";
import { storeToRefs } from "pinia";
import { useCounterStore } from "src/stores/modules/permission";
import ToolbarTitle from "./components/ToolbarTitle.vue";
import BreadCrumbs from "./components/BreadCrumbs.vue";
import TagView from "./components/TagView.vue";
import SetupDialog from "./components/SetupDialog.vue";
import { languageDatas } from "./data";
import { useRouter } from "vue-router";
const { go } = useRouter();
const appStore = useCounterStore();
const { getKeepAliveList, getMenuLink } = storeToRefs(appStore);
const KeepAliveList = computed(() => {
	return getKeepAliveList.value;
});
const essentialLinks = computed(() => {
	return getMenuLink.value;
});
const leftDrawerOpen = ref(false);

// 设置弹出框
const setupDialogAlert = ref(false);
/**
 * @description: 文字切换
 */
const languageSwitch = (e: string) => {
	try {
		const language = e == "English" ? "en-US" : "zh-CN";
		// $q.localStorage.set("language", language);
		localStorage.setItem("language", language);
		go(0);
	} catch (e) {
		console.log(e);
	}
};
/**
 * @description: 设置模块开关
 */
const openSetup = () => {
	setupDialogAlert.value = !setupDialogAlert.value;
};
</script>

<template>
	<q-layout view="hHh lpR fFf" class="full-height">
		<q-header
			class="q-py-xs bgc-variable"
			:class="$q.dark.mode ? 'bg-dark' : 'text-grey-8'"
			height-hint="48"
			style="box-shadow: rgba(0, 0, 0, 0.1) 0 2px 12px 0; padding-bottom: 2px"
		>
			<!-- 状态栏 -->
			<q-toolbar style="margin-top: -4px" class="q-electron-drag">
				<q-btn
					flat
					dense
					round
					aria-label="Menu"
					:icon="leftDrawerOpen === true ? 'menu_open' : 'menu'"
					@click="leftDrawerOpen = !leftDrawerOpen"
				/>
				<!-- toolbar - title -->
				<ToolbarTitle />
				<BreadCrumbs />
				<q-space />
				<q-btn round dense flat :color="$q.dark.mode ? '' : 'grey-9'" size="sm" icon="translate">
					<q-menu transition-show="jump-down" transition-hide="jump-up" :offset="[0, 24]">
						<q-list style="min-width: 120px" dense>
							<q-item
								@click="languageSwitch(item.label)"
								clickable
								v-close-popup
								v-for="(item, index) in languageDatas"
								:key="index"
							>
								<q-item-section avatar class="q-mr-sm q-pa-none" style="min-width: 20px">
									<q-icon :name="item.nationalFlag" />
								</q-item-section>
								<q-item-section>{{ item.label }}</q-item-section>
							</q-item>
						</q-list>
					</q-menu>
				</q-btn>

				<q-btn @click="openSetup" round size="xs" class="q-mx-md" icon="settings" />
				<span>头像</span>
			</q-toolbar>
			<q-separator :color="$q.dark.mode ? '' : 'grey-3'" />
			<!-- TAGVIEW -->
			<TagView />
		</q-header>
		<!-- 弹出设置 -->
		<SetupDialog @closeDialog="openSetup" v-bind="{ alert: setupDialogAlert }" />
		<q-drawer
			class="bgc-variable"
			v-model="leftDrawerOpen"
			show-if-above
			:content-class="$q.dark.mode ? 'bg-dark' : ''"
			:width="240"
		>
			<q-list>
				<EssentialLink v-for="link in essentialLinks" :key="link.name" v-bind="link" />
			</q-list>
		</q-drawer>

		<q-page-container class="app-main overflow-auto">
			<router-view v-slot="{ Component }">
				<transition mode="out-in">
					<keep-alive :max="10" :include="KeepAliveList">
						<component :is="Component" />
					</keep-alive>
				</transition>
			</router-view>
		</q-page-container>
	</q-layout>
</template>

<style lang="scss" scoped></style>
