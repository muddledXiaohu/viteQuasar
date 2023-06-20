<script setup lang="ts">
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { computed } from "vue";
interface Props {
	rows: Array<any>;
	columns: Array<any>;
}
const props = withDefaults(defineProps<Props>(), {
	rows: () => [],
	columns: () => []
});
</script>
<template>
	<div class="wrap-container sn-container">
		<div class="sn-content">
			<div class="sn-body">
				<div class="wrap-container">
					<div class="table">
						<table border="0" cellpadding="0" cellspacing="0" class="table-header">
							<tbody>
								<tr>
									<td :width="item.width" v-for="(item, idx) in rows" :key="idx">
										<span>{{ item.name }}</span>
									</td>
								</tr>
							</tbody>
						</table>

						<vue3-seamless-scroll :list="columns" class="seamless-warp" :step="0.4" :wheel="true" :isWatch="true" :hover="true">
							<table border="0" cellpadding="0" cellspacing="0" class="item">
								<tbody>
									<tr v-for="(item, index) in columns" :key="index">
										<td width="100%" class="title">
											<span>{{ item.title }}</span>
										</td>
										<td :width="rows[1].width">
											<span>{{ item.date }}</span>
										</td>
										<td :width="rows[2].width">
											<span
												:class="{ colorRed: item.hot == '特急', colorOrange: item.hot == '紧急', colorGreen: item.hot == '一般' }"
												>{{ item.hot }}</span
											>
										</td>
									</tr>
								</tbody>
							</table>
						</vue3-seamless-scroll>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="sass" scoped>
.sn-container
	left: 1370px
	top: 110px
	%table-style
		width: 100%
		height: 35px
		table-layout: fixed
		tr
			td
				padding: 10px 5px
				text-align: center
				background-color: transparent
				white-space: nowrap
				overflow: hidden
				color: #999
				font-size: 14px



	.table
		.table-header
			@extend %table-style

		.seamless-warp
			height: 400px
			overflow: hidden
			visibility: visible
			.colorRed
				color: #ff4669

			.colorOrange
				color: #ffc956

			.colorGreen
				color: #00c96c

			.item
				height: auto
				@extend %table-style
				tr
					td
						&.title
							text-overflow: ellipsis
							display: inline-block
</style>
