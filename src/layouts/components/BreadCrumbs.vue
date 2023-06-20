<script setup lang="ts">
import { computed } from "vue";
import { useCounterStore } from "src/stores/modules/permission";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const appStore = useCounterStore();
const breadcrumbList = computed(() => appStore.getBreadcrumbs);
</script>
<template>
	<q-breadcrumbs class="flex items-center" active-color="none" style="transform: translateX(10px)">
		<template v-for="(v, i) in breadcrumbList" :key="i">
			<q-breadcrumbs-el :label="t(String(v.meta.name))" :icon="v.meta.icon" />
		</template>
	</q-breadcrumbs>
</template>

<style scoped></style>
