<script lang="ts">
import { defineComponent, ref, Ref, PropType, onMounted } from "vue";
import BaseContent from "components/BaseContent/index.vue";
import DateTabs from "./components/DateTabs.vue";
import { useECharts } from "src/hooks/web/useECharts";
import { lineOption, barOption, radarOption, diskOption } from "./data";
import { useQuasar } from "quasar";
export default defineComponent({
	name: "Overview",
	props: {
		width: {
			type: String as PropType<string>,
			default: "49.5%"
		},
		height: {
			type: String as PropType<string>,
			default: "calc(50vh - 60px)"
		}
	},
	components: { BaseContent, DateTabs },
	setup() {
		const $q = useQuasar();
		const chartRef1 = ref<HTMLDivElement | null>(null);
		const chartRef2 = ref<HTMLDivElement | null>(null);
		const chartRef3 = ref<HTMLDivElement | null>(null);
		const chartRef4 = ref<HTMLDivElement | null>(null);
		const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>);
		const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>);
		const { setOptions: setOptions3 } = useECharts(chartRef3 as Ref<HTMLDivElement>);
		const { setOptions: setOptions4 } = useECharts(chartRef4 as Ref<HTMLDivElement>);
		onMounted(() => {
			setOptions1(lineOption);

			setOptions2(barOption);

			setOptions3(radarOption);

			setOptions4(diskOption);
		});
		return {
			chartRef1,
			chartRef2,
			chartRef3,
			chartRef4
		};
	}
});
</script>
<template>
	<Base-Content>
		<div class="row">
			<div class="col">
				<div class="row q-col-gutter-xs">
					<div class="col-6">
						<div class="q-pa-xs">
							<q-card
								dark
								bordered
								:class="$q.dark.mode ? 'bg-dark' : 'bg-white'"
								class="text-grey-9 column"
								:style="{ height, width: '100%' }"
							>
								<div class="col-2 flex items-center justify-between q-px-lg">
									<div>CPU</div>
									<DateTabs />
								</div>
								<q-separator />
								<q-card-section class="col overflow-hidden">
									<div class="echartItem" ref="chartRef1"></div>
								</q-card-section>
							</q-card>
						</div>
					</div>
					<div class="col-6">
						<div class="q-pa-xs">
							<q-card
								dark
								bordered
								:class="$q.dark.mode ? 'bg-dark' : 'bg-white'"
								class="text-grey-9 column"
								:style="{ height, width: '100%' }"
							>
								<div class="col-2 flex items-center justify-between q-px-lg">
									<div>平均负载</div>
									<DateTabs />
								</div>
								<q-separator />
								<q-card-section class="col overflow-hidden">
									<div class="echartItem" ref="chartRef2"></div>
								</q-card-section>
							</q-card>
						</div>
					</div>
					<div class="col-6">
						<div class="q-pa-xs">
							<q-card
								dark
								bordered
								:class="$q.dark.mode ? 'bg-dark' : 'bg-white'"
								class="text-grey-9 column"
								:style="{ height, width: '100%' }"
							>
								<div class="col-2 flex items-center justify-between q-px-lg">
									<div>内存</div>
									<DateTabs />
								</div>
								<q-separator />
								<q-card-section class="col overflow-hidden">
									<div class="echartItem" ref="chartRef3"></div>
								</q-card-section>
							</q-card>
						</div>
					</div>
					<div class="col-6">
						<div class="q-pa-xs">
							<q-card
								dark
								bordered
								:class="$q.dark.mode ? 'bg-dark' : 'bg-white'"
								class="text-grey-9 column"
								:style="{ height, width: '100%' }"
							>
								<div class="col-2 flex items-center justify-between q-px-lg">
									<div>磁盘占用率</div>
									<DateTabs />
								</div>
								<q-separator />
								<q-card-section class="col overflow-hidden">
									<div class="echartItem" ref="chartRef4"></div>
								</q-card-section>
							</q-card>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Base-Content>
</template>

<style lang="scss" scoped>
.echartItem {
	width: 100%;
	height: 100%;
}
</style>
