<script setup lang="ts">
import { computed } from "vue";
import { useCounterStore } from "src/stores/modules/permission";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const appStore = useCounterStore();
export interface EssentialLinkProps {
	name: string;
	caption?: string;
	keepAlive?: boolean;
	url?: string;
	icon?: string;
	linkName?: string;
	children?: any;
}

const props = withDefaults(defineProps<EssentialLinkProps>(), {
	name: "",
	caption: "",
	url: "#",
	keepAlive: false,
	icon: "",
	linkName: ""
});

const defaultOpened = computed(() => appStore.getBreadcrumbs);
const externalLink = () => {
	if (props.keepAlive) {
		appStore.setTagView(props);
	}
};
</script>
<template>
	<q-item v-if="!children" :exact="url === '/'" v-ripple active-class="baseItemActive" clickable :to="url">
		<q-item-section v-if="icon" avatar>
			<q-icon :name="icon" />
		</q-item-section>

		<q-item-section>
			<q-item-label>{{ t(linkName) }}</q-item-label>
			<q-item-label caption>{{ t(caption) }}</q-item-label>
		</q-item-section>
	</q-item>

	<q-expansion-item
		v-else
		:default-opened="defaultOpened[0].name == name"
		:duration="200"
		:header-inset-level="0"
		:icon="icon"
		:label="t(caption)"
	>
		<!-- 菜单项缩进 + 0.2 ; 背景色深度 + 1 ; 如果上级菜单路径存在，则拼接上级菜单路径 -->
		<EssentialLink v-for="link in children" :key="link.name" v-bind="link" />
	</q-expansion-item>
</template>
<style lang="sass" scoped>

/* item 被激活时的样式 */
.baseItemActive
  color: #1976d2 !important
  background: rgba(25, 118, 210, 0.0618)
  transition: all .618s
  &:after
    content: ''
    position: absolute
    width: 3px
    height: 100%
    background: #1976d2 !important
    top: 0
    right: 0
</style>
