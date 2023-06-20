<script setup lang="ts">
import { thumbStyle } from "./data";
</script>
<template>
	<div class="main-content">
		<q-scroll-area ref="scrollArea" :thumb-style="thumbStyle" :visible="false" style="height: 100%">
			<slot />
		</q-scroll-area>
	</div>
</template>
<style scoped></style>
