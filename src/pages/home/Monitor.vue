<script lang="ts">
import { defineComponent, ref, Ref, PropType, onMounted } from "vue";
import BaseContent from "components/BaseContent/index.vue";
import Seamless from "./components/Seamless.vue";
import { useECharts } from "src/hooks/web/useECharts";
import { lineOption, barOption, radarOption } from "./data";
import { useQuasar } from "quasar";
export default defineComponent({
	name: "Monitor",
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
	components: { BaseContent, Seamless },
	setup() {
		const $q = useQuasar();
		const chartRef1 = ref<HTMLDivElement | null>(null);
		const chartRef2 = ref<HTMLDivElement | null>(null);
		const chartRef3 = ref<HTMLDivElement | null>(null);
		const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>);
		const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>);
		const { setOptions: setOptions3 } = useECharts(chartRef3 as Ref<HTMLDivElement>);
		const tabSelected = ref("normal");
		onMounted(() => {
			setOptions1(lineOption);

			setOptions2(barOption);

			setOptions3(radarOption);
		});
		return { chartRef1, chartRef2, chartRef3, tabSelected };
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
								<div class="col-2 flex items-center justify-between q-px-md">
									<q-tabs
										v-model="tabSelected"
										dense
										active-color="primary"
										class="text-grey"
										indicator-color="primary"
										align="left"
										narrow-indicator
										no-caps
										inline-label
									>
										<q-tab name="normal" icon="credit_score" label="运行设备" />
										<q-tab name="maintenance" icon="miscellaneous_services" label="故障设备" />
									</q-tabs>
								</div>
								<q-separator />
								<q-card-section class="row" v-if="tabSelected == 'normal'">
									<div class="col-2 text-center" v-for="item in 8" :key="item">
										<div>
											<q-icon size="md" color="teal-12" name="display_settings" />
										</div>
										<div class="text-grey-8 text-h6">设备{{ item }}</div>
										<div class="text-blue-6 text-h6">200</div>
									</div>
								</q-card-section>
								<q-card-section class="row" v-else>
									<div class="col-2 text-center" v-for="item in 2" :key="item">
										<div>
											<q-icon size="md" color="teal-12" name="display_settings" />
										</div>
										<div class="text-grey-8 text-h6">设备{{ item }}</div>
										<div class="text-blue-6 text-h6">2</div>
									</div>
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
								<div class="col-2 flex items-center justify-between q-px-md">
									<div>故障设备列表</div>
								</div>
								<q-separator />
								<q-card-section class="col-9 overflow-hidden"> <Seamless /> </q-card-section>
							</q-card>
						</div>
					</div>
					<div class="col-4">
						<div class="q-pa-xs">
							<q-card
								dark
								bordered
								:class="$q.dark.mode ? 'bg-dark' : 'bg-white'"
								class="text-grey-9 column"
								:style="{ height, width: '100%' }"
							>
								<div class="col-2 flex items-center justify-between q-px-lg">
									<div>故障时间</div>
								</div>
								<q-separator />
								<q-card-section class="col overflow-hidden">
									<div class="echartItem" ref="chartRef1"></div>
								</q-card-section>
							</q-card>
						</div>
					</div>
					<div class="col-4">
						<div class="q-pa-xs">
							<q-card
								dark
								bordered
								:class="$q.dark.mode ? 'bg-dark' : 'bg-white'"
								class="text-grey-9 column"
								:style="{ height, width: '100%' }"
							>
								<div class="col-2 flex items-center justify-between q-px-lg">
									<div>故障类型</div>
								</div>
								<q-separator />
								<q-card-section class="col overflow-hidden">
									<div class="echartItem" ref="chartRef2"></div>
								</q-card-section>
							</q-card>
						</div>
					</div>
					<div class="col-4">
						<div class="q-pa-xs">
							<q-card
								dark
								bordered
								:class="$q.dark.mode ? 'bg-dark' : 'bg-white'"
								class="text-grey-9 column"
								:style="{ height, width: '100%' }"
							>
								<div class="col-2 flex items-center justify-between q-px-lg">
									<div>故障设备列表</div>
								</div>
								<q-separator />
								<q-card-section class="col overflow-hidden">
									<div class="echartItem" ref="chartRef3"></div>
								</q-card-section>
							</q-card>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Base-Content>
</template>

<style lang="sass" scoped>
.echartItem
  width: 100%
  height: 100%
</style>
