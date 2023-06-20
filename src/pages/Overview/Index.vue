<script lang="ts">
import { defineComponent, ref, Ref, PropType, onMounted } from "vue";
import BaseContent from "components/BaseContent/index.vue";
import Seamless from "./components/Seamless.vue";
import DetailsHardDisk from "./components/DetailsHardDisk.vue";
import { useECharts } from "src/hooks/web/useECharts";
import {
	lineOption,
	barOption,
	radarOption,
	tooltipColumns,
	giveAnAlarmRows,
	giveAnAlarmColumns,
	SSHColumns,
	commandColumns,
	SSHRows,
	commandRows
} from "./data";
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
	components: { BaseContent, Seamless, DetailsHardDisk },
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
		const init = () => {
			$q.notify({
				message: "服务器A硬盘已满，请尽快处理!",
				icon: "announcement",
				color: "negative",
				timeout: 60000,
				actions: [
					{
						label: "关闭",
						color: "white",
						handler: () => {
							/* ... */
						}
					}
				]
			});
		};
		init();
		return {
			chartRef1,
			chartRef2,
			chartRef3,
			tabSelected,
			tooltipColumns,
			giveAnAlarmRows,
			giveAnAlarmColumns,
			SSHColumns,
			commandColumns,
			SSHRows,
			commandRows
		};
	}
});
</script>
<template>
	<Base-Content>
		<div class="row">
			<div class="col">
				<div class="row q-col-gutter-xs">
					<div class="col-3">
						<div class="q-pa-xs">
							<q-card
								dark
								bordered
								:class="$q.dark.mode ? 'bg-dark' : 'bg-white'"
								class="text-grey-9 column"
								:style="{ height, width: '100%' }"
							>
								<div class="col-2 flex items-center justify-between q-px-lg">
									<div>主机统计</div>
								</div>
								<q-separator />
								<q-card-section class="col overflow-hidden column justify-around">
									<div class="row text-center text-white" style="height: 40%">
										<div class="column justify-center col-4 bg-green-13">
											<p>正常</p>
											<p>30</p>
										</div>
										<div class="column justify-center col-4 bg-yellow-9">
											<p>告警中</p>
											<p>0</p>
										</div>
										<div class="column justify-center col-4 bg-deep-orange-10">
											<p>离线</p>
											<p>4</p>
										</div>
									</div>
									<div class="row text-center text-white" style="height: 40%">
										<div class="column justify-center col-4 bg-deep-orange-10">
											<p>已满</p>
											<p>1</p>
											<q-tooltip class="q-pa-none" anchor="center right" self="center left" :offset="[10, 10]">
												<DetailsHardDisk v-bind="{ tooltipColumns }" />
											</q-tooltip>
										</div>
									</div>
								</q-card-section>
							</q-card>
						</div>
					</div>
					<div class="col-3">
						<div class="q-pa-xs">
							<q-card
								dark
								bordered
								:class="$q.dark.mode ? 'bg-dark' : 'bg-white'"
								class="text-grey-9 column"
								:style="{ height, width: '100%' }"
							>
								<div class="col-2 flex items-center justify-between q-px-lg">
									<div>告警事件</div>
								</div>
								<q-separator />
								<q-card-section class="col overflow-hidden">
									<Seamless
										v-bind="{
											rows: giveAnAlarmRows,
											columns: giveAnAlarmColumns
										}"
									/>
								</q-card-section>
							</q-card>
						</div>
					</div>
					<div class="col-3">
						<div class="q-pa-xs">
							<q-card
								dark
								bordered
								:class="$q.dark.mode ? 'bg-dark' : 'bg-white'"
								class="text-grey-9 column"
								:style="{ height, width: '100%' }"
							>
								<div class="col-2 flex items-center justify-between q-px-lg">
									<div>危险命令执行</div>
								</div>
								<q-separator />
								<q-card-section class="col overflow-hidden">
									<Seamless
										v-bind="{
											rows: SSHRows,
											columns: SSHColumns
										}"
									/>
								</q-card-section>
							</q-card>
						</div>
					</div>
					<div class="col-3">
						<div class="q-pa-xs">
							<q-card
								dark
								bordered
								:class="$q.dark.mode ? 'bg-dark' : 'bg-white'"
								class="text-grey-9 column"
								:style="{ height, width: '100%' }"
							>
								<div class="col-2 flex items-center justify-between q-px-lg">
									<div>危险命令执行</div>
								</div>
								<q-separator />
								<q-card-section class="col overflow-hidden">
									<Seamless
										v-bind="{
											rows: commandRows,
											columns: commandColumns
										}"
									/>
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
									<div>主机CPU使用率</div>
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
									<div>主机CPU使用率</div>
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
									<div>主机带宽使用排行</div>
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
