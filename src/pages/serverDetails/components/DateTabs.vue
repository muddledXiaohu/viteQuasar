<script setup lang="ts">
import { computed, watch, ref } from "vue";
const tabValue = ref("today");
</script>
<template>
	<q-tabs
		v-model="tabValue"
		dense
		active-color="primary"
		class="text-grey q-pa-sm"
		indicator-color="primary"
		align="left"
		narrow-indicator
		no-caps
		inline-label
	>
		<q-tab name="today" label="今日" />
		<q-tab name="yesterday" label="昨日" />
		<q-tab name="7days" label="最近7天" />
		<q-tab name="30days" label="最近30天" />
	</q-tabs>
</template>
<style scoped></style>
