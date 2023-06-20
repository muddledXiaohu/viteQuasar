<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useCounterStore } from "src/stores/modules/permission";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
const $q = useQuasar();
const { t } = useI18n();
const appStore = useCounterStore();
const { getTagView, getLocale } = storeToRefs(appStore);

/**
 * 如果是微信浏览器，则添加 line-height: normal 样式
 * @returns {boolean}
 */
const isWeChart = () => {
	return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
};
const tagView = computed(() => getTagView.value);
const locale = computed(() => getLocale.value);
const removeAtagView = (i: number) => {
	appStore.removeTagView(i);
};
</script>

<template>
	<div class="row" :style="{ margin: !$q.screen.gt.sm ? '' : '0px 15px 0px 15px' }">
		<q-tabs
			align="left"
			active-color="primary"
			class="col-12 bgc-variable"
			:class="$q.dark.mode ? 'bg-dark' : ''"
			dense
			swipeable
			inline-label
			indicator-color="transparent"
			:outside-arrows="$q.platform.is.electron ? true : false"
			:breakpoint="0"
		>
			<q-route-tab
				class="tagView"
				to="/start/home"
				no-caps
				content-class="tagView-q-router-tab"
				:style="isWeChart() ? ' line-height: normal' : ''"
			>
				<template v-slot:default>
					<q-icon size="1.3rem" name="home" />
					<div class="line-limit-length" style="margin: 0px 5px 0px 5px">
						{{ locale !== "zh-CN" ? "Home" : "视图" }}
					</div>
				</template>
			</q-route-tab>

			<template v-for="(v, i) in tagView" :key="v.url + i">
				<q-route-tab
					class="tagView"
					:to="v.url"
					no-caps
					content-class="tagView-q-router-tab"
					:style="isWeChart() ? ' line-height: normal' : ''"
				>
					<template v-slot:default>
						<q-icon size="1.3rem" v-if="v.icon" :name="v.icon" />
						<div class="line-limit-length">{{ t(v.linkName) }}</div>
						<q-icon
							class="tagView-remove-icon"
							style="display: inline-flex"
							name="close"
							@click.prevent.stop="removeAtagView(i)"
						/>
						<q-menu touch-position context-menu>
							<q-list dense>
								<q-item clickable v-close-popup>
									<q-item-section> 关闭其他 </q-item-section>
								</q-item>
								<q-item clickable v-close-popup>
									<q-item-section> 关闭右侧 </q-item-section>
								</q-item>
								<q-item clickable v-close-popup>
									<q-item-section> 关闭左侧 </q-item-section>
								</q-item>
								<q-item clickable v-close-popup>
									<q-item-section> 关闭所有 </q-item-section>
								</q-item>
							</q-list>
						</q-menu>
					</template>
				</q-route-tab>
			</template>
		</q-tabs>
	</div>
</template>
<style scoped></style>
