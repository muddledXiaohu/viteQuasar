<script lang="ts">
import { defineComponent, PropType, ref, Ref, onMounted } from "vue";
import { useECharts } from "src/hooks/web/useECharts";
import Seamless from "./components/Seamless.vue";

export default defineComponent({
	name: "Git",
	props: {
		width: {
			type: String as PropType<string>,
			default: "48%"
		},
		height: {
			type: String as PropType<string>,
			default: "calc(100vh - 110px)"
		},
		topHeight: {
			type: String as PropType<string>,
			default: "calc(100vh - 49vh)"
		}
	},
	components: {
		Seamless
	},
	setup() {
		const chartRef1 = ref<HTMLDivElement | null>(null);
		const chartRef2 = ref<HTMLDivElement | null>(null);
		const { setOptions, echarts } = useECharts(chartRef1 as Ref<HTMLDivElement>);
		const { setOptions: setOptions1 } = useECharts(chartRef2 as Ref<HTMLDivElement>);

		onMounted(() => {
			let category = [];
			let dottedBase = +new Date();
			let lineData = [];
			let barData = [];
			for (let i = 0; i < 20; i++) {
				let date = new Date((dottedBase += 3600 * 24 * 1000));
				category.push([date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-"));
				let b = Math.random() * 200;
				let d = Math.random() * 200;
				barData.push(b);
				lineData.push(d + b);
			}
			const a = {
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "shadow"
					}
				},
				legend: {
					data: ["line", "bar"],
					textStyle: {
						color: "#ccc"
					}
				},
				xAxis: {
					data: category,
					axisLine: {
						lineStyle: {
							color: "#ccc"
						}
					}
				},
				yAxis: {
					splitLine: { show: false },
					axisLine: {
						lineStyle: {
							color: "#ccc"
						}
					}
				},
				series: [
					{
						name: "line",
						type: "line",
						smooth: true,
						showAllSymbol: true,
						symbol: "emptyCircle",
						symbolSize: 15,
						data: lineData
					},
					{
						name: "bar",
						type: "bar",
						barWidth: 10,
						itemStyle: {
							borderRadius: 5,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: "#14c8d4" },
								{ offset: 1, color: "#43eec6" }
							])
						},
						data: barData
					},
					{
						name: "line",
						type: "bar",
						barGap: "-100%",
						barWidth: 10,
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: "rgba(20,200,212,0.5)" },
								{ offset: 0.2, color: "rgba(20,200,212,0.2)" },
								{ offset: 1, color: "rgba(20,200,212,0)" }
							])
						},
						z: -12,
						data: lineData
					},
					{
						name: "dotted",
						type: "pictorialBar",
						symbol: "rect",
						itemStyle: {
							color: "#0f375f"
						},
						symbolRepeat: true,
						symbolSize: [12, 4],
						symbolMargin: 1,
						z: -10,
						data: lineData
					}
				]
			};
			setOptions(a);
			setOptions1({
				title: [
					{
						text: "各渠道投诉占比",
						left: "2%",
						top: "1%",
						textStyle: {
							color: "#ccc",
							fontSize: 14
						}
					},
					{
						text: "各级别投诉占比",
						left: "2%",
						top: "50%",
						textStyle: {
							color: "#ccc",
							fontSize: 14
						}
					}
				],
				grid: [{ left: "50%", top: "7%", width: "45%", height: "90%" }],
				tooltip: {
					formatter: "{b} ({c})"
				},
				series: [
					{
						name: "各渠道投诉占比",
						type: "pie",
						radius: "30%",
						center: ["50%", "25%"],
						data: [
							{ value: 335, name: "客服电话" },
							{ value: 310, name: "奥迪官网" },
							{ value: 234, name: "媒体曝光" },
							{ value: 135, name: "质检总局" },
							{ value: 105, name: "其他" }
						],
						labelLine: { show: false },
						label: {
							show: true,
							formatter: "{b} \n ({d}%)",
							color: "#B1B9D3"
						}
					},
					{
						name: "各级别投诉占比",
						type: "pie",
						radius: "30%",
						center: ["50%", "75%"],
						labelLine: { show: false },
						data: [
							{ value: 335, name: "A级" },
							{ value: 310, name: "B级" },
							{ value: 234, name: "C级" },
							{ value: 135, name: "D级" }
						],
						label: {
							show: true,
							formatter: "{b} \n ({d}%)",
							color: "#B1B9D3"
						}
					}
				]
			});
		});
		return { chartRef1, chartRef2 };
	}
});
</script>
<template>
	<div class="Git">
		<div class="leftView">
			<div class="echartItem" ref="chartRef1" :style="{ height: topHeight, width: '98%' }"></div>
			<div class="seamles echartItem"><Seamless /></div>
		</div>
		<div class="echartItem" ref="chartRef2" :style="{ height, width }"></div>
	</div>
</template>
<style lang="sass" scoped>
.Git
	display: flex
	.echartItem
		background-color: #fff
		margin: 10px
.leftView
	width: 50%
	display: flex
	flex-direction: column
	.seamles
		height: 200px
		overflow: hidden
</style>
