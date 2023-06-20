<script lang="ts">
import { ref, defineComponent } from "vue";
import { useQuasar } from "quasar";
import BaseContent from "components/BaseContent/index.vue";
import { zabbixApi } from "src/api/home/home";
import { useCounterStore } from "src/stores/modules/permission";
import { columns, initialPagination, dataConversion } from "./data.ts";
import { useRouter } from "vue-router";
export default defineComponent({
	name: "Home",
	components: { BaseContent },
	setup() {
		const $q = useQuasar();
		const router = useRouter();
		const appStore = useCounterStore();

		let listData = ref([]);
		let originalListData = ref([]);
		const filter = ref("");
		let HardDiskValue = ref(0);

		// 服务器合并硬盘等信息
		let serverValue = ref({
			totalHardDisk: 0,
			usedHardDisk: 0
		});
		/**
		 * @description: 初始化
		 */
		const init = async () => {
			// 获取服务器列表
			const serverList = await zabbixApi({
				jsonrpc: "2.0",
				method: "host.get",
				params: {
					output: ["host"]
				},
				auth: appStore.getToken,
				id: 1
			});

			const serverId = serverList.result.map(item => {
				return item.hostid;
			});
			originalListData.value = serverList.result;

			// 内存
			await initRAM(serverId);
			// 硬盘
			await initHardDisk(serverId);
		};
		const initHardDisk = async (serverList: any) => {
			// 数据盘总容量
			const totalD = await zabbixApi({
				jsonrpc: "2.0",
				method: "item.get",
				params: {
					output: "extend",
					hostids: serverList || [],
					search: {
						key_: "vfs.fs.size[/data,total]"
					},
					sortfield: "name"
				},
				auth: appStore.getToken,
				id: 1
			});
			// 系统盘总容量
			const totalC = await zabbixApi({
				jsonrpc: "2.0",
				method: "item.get",
				params: {
					output: "extend",
					hostids: serverList || [],
					search: {
						key_: "vfs.fs.size[/,total]"
					},
					sortfield: "name"
				},
				auth: appStore.getToken,
				id: 1
			});

			// 数据盘已使用容量
			const usedD = await zabbixApi({
				jsonrpc: "2.0",
				method: "item.get",
				params: {
					output: "extend",
					hostids: serverList || [],
					search: {
						key_: "vfs.fs.size[/data,used]"
					},
					sortfield: "name"
				},
				auth: appStore.getToken,
				id: 1
			});
			// 系统盘已使用容量
			const usedC = await zabbixApi({
				jsonrpc: "2.0",
				method: "item.get",
				params: {
					output: "extend",
					hostids: serverList || [],
					search: {
						key_: "vfs.fs.size[/,used]"
					},
					sortfield: "name"
				},
				auth: appStore.getToken,
				id: 1
			});

			// console.log(totalD, totalC, usedD, usedC);
			listData.value = listData.value.map(e => {
				const data = e;
				if (e && e.id) {
					const totalCValue = totalC?.result.find(i => i.hostid == e.id)?.prevvalue || 0;
					const totalDValue = totalD?.result.find(i => i.hostid == e.id)?.prevvalue || 0;
					data.hardDiskTotalC = dataConversion(totalCValue);
					data.hardDiskTotalD = dataConversion(totalDValue);
					data.hardDiskTotal = dataConversion(Number(totalCValue) + Number(totalDValue));
					const usedCValue = usedC?.result.find(i => i.hostid == e.id)?.prevvalue || 0;
					const usedDValue = usedD?.result.find(i => i.hostid == e.id)?.prevvalue || 0;
					data.hardDiskUsedC = dataConversion(usedCValue);
					data.hardDiskUsedD = dataConversion(usedDValue);
					data.hardDiskUsed = dataConversion(Number(usedCValue) + Number(usedDValue));
					data.residueHardDisk = (data.hardDiskTotal - data.hardDiskUsed).toFixed(4);
					serverValue.value.totalHardDisk += Number(totalCValue) + Number(totalDValue);
					serverValue.value.usedHardDisk += Number(usedCValue) + Number(usedDValue);
					// name
					const host = originalListData.value.find(i => i.hostid == e.id)?.host || "";
					data.host = host;
				}
				return data;
			});
			HardDiskValue.value = Math.round((serverValue.value.usedHardDisk / serverValue.value.totalHardDisk) * 100);
		};
		const initRAM = async (serverList: any) => {
			// 系统中已用内存量
			const availableRAM = await zabbixApi({
				jsonrpc: "2.0",
				method: "item.get",
				params: {
					output: "extend",
					hostids: serverList || [],
					search: {
						key_: "vm.memory.size[available]"
					},
					sortfield: "name"
				},
				auth: appStore.getToken,
				id: 1
			});
			// 系统总共内存量
			const totalRAM = await zabbixApi({
				jsonrpc: "2.0",
				method: "item.get",
				params: {
					output: "extend",
					hostids: serverList || [],
					search: {
						key_: "vm.memory.size[total]"
					},
					sortfield: "name"
				},
				auth: appStore.getToken,
				id: 1
			});

			totalRAM.result.forEach(e => {
				if (e && e.prevvalue) {
					const availableRamValue = availableRAM?.result.find(i => i.hostid == e.hostid)?.prevvalue || 0;
					listData.value.push({
						id: e.hostid,
						totalRAM: dataConversion(e.prevvalue),
						availableRAM: dataConversion(availableRamValue),
						residueRAM: dataConversion(Number(e.prevvalue) - Number(availableRamValue))
					});
				}
			});
		};
		init();

		/**
		 * @description: 初始化
		 */
		const tableListCk = e => {
			console.log(e);
			router.push({ name: "serverDetails" });
		};
		return {
			serverValue,
			HardDiskValue,
			initialPagination,
			listData,
			columns,
			filter,
			tableListCk
		};
	}
});
</script>
<template>
	<Base-Content>
		<div>
			<div class="state row" :class="$q.dark.mode ? 'bg-dark' : 'bg-white'">
				<div class="col column inline items-center q-mr-xl">
					<p>磁盘使用</p>
					<q-circular-progress
						show-value
						font-size="18px"
						:value="HardDiskValue"
						size="120px"
						:thickness="0.22"
						color="green-8"
						track-color="grey-3"
						class="q-ma-md text-light-green-8"
					>
						{{ HardDiskValue }}%
						<q-tooltip class="q-pa-none" anchor="center right" self="center left" :offset="[10, 10]">
							<q-tab-panel name="mails">
								<div class="text-h6">磁盘信息</div>
								<div>磁盘已使用：{{ (serverValue.usedHardDisk / 1024 / 1024 / 1024).toFixed(2) }} G</div>
								<div>磁盘总容量：{{ (serverValue.totalHardDisk / 1024 / 1024 / 1024).toFixed(2) }} G</div>
							</q-tab-panel>
						</q-tooltip>
					</q-circular-progress>
					<p class="text-grey-7">
						{{ (serverValue.usedHardDisk / 1024 / 1024 / 1024).toFixed(2) }} G /
						{{ (serverValue.totalHardDisk / 1024 / 1024 / 1024).toFixed(2) }} G
					</p>
				</div>
			</div>
			<q-table
				:pagination="initialPagination"
				:rows-per-page-options="[4, 8, 16]"
				grid
				title="服务器列表"
				:rows="listData"
				:columns="columns"
				row-key="name"
				:filter="filter"
				hide-header
			>
				<template v-slot:top-right>
					<q-input borderless dense debounce="300" v-model="filter" placeholder="服务器查询">
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</template>

				<template v-slot:item="props">
					<div
						@click="tableListCk(props.row)"
						class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
						:style="props.selected ? 'transform: scale(0.95);' : ''"
					>
						<q-card :class="props.selected ? 'bg-grey-2' : ''">
							<q-card-section>
								<div>{{ props.cols[0].value }}</div>
							</q-card-section>
							<q-separator />
							<q-list dense>
								<q-item v-for="col in props.cols.filter(col => col.name !== 'host')" :key="col.name">
									<q-linear-progress
										v-if="col.label == '已用内存'"
										:value="col.value.value"
										size="20px"
										color="green-8"
										class="q-mt-sm"
									>
										<div class="absolute-full flex items-center justify-end">
											<p class="text-white text-caption">{{ (col.value.value * 100).toFixed(1) }}%，{{ col.value.title }}</p>
										</div>
									</q-linear-progress>
									<q-linear-progress
										v-else-if="col.label == '硬盘已使用容量'"
										:value="col.value.value"
										size="20px"
										color="green-8"
										class="q-mt-sm"
									>
										<div class="absolute-full flex items-center justify-end">
											<p class="text-white text-caption">{{ (col.value.value * 100).toFixed(1) }}%，{{ col.value.title }}</p>
										</div>
									</q-linear-progress>
									<template v-else>
										<q-item-section>
											<q-item-label>{{ col.label }}</q-item-label>
										</q-item-section>
										<q-item-section side>
											<q-item-label caption>{{ col.value }}</q-item-label>
										</q-item-section>
									</template>
								</q-item>
							</q-list>
						</q-card>
					</div>
				</template>
			</q-table>
		</div>
	</Base-Content>
</template>

<style scoped lang="scss">
.state {
	width: 100%;
	height: 200px;
}
</style>
