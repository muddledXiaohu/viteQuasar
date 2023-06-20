<template>
	<q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
		<q-toolbar-title shrink class="text-weight-bold">
			{{ title }}
		</q-toolbar-title>
	</q-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";
const title = ref("弘元LOGO");
</script>
