<script setup lang="ts">
import { tooltipRows } from "./data";
interface Props {
	tooltipColumns: Array<any>;
}
const props = withDefaults(defineProps<Props>(), {
	tooltipColumns: () => []
});
</script>
<template>
	<div>
		<q-table
			flat
			bordered
			card-class=" no-shadow"
			:hide-pagination="true"
			:rows="tooltipRows"
			:columns="tooltipColumns"
			row-key="name"
		>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td key="name" :props="props" class="text-grey-5">
						<p class="text-light-green-9">{{ props.row.name }}</p>
						<p>128.1.163.39</p>
					</q-td>
					<q-td key="calories" :props="props" class="row items-center">
						<q-knob
							show-value
							font-size="12px"
							v-model="props.row.calories"
							size="50px"
							:thickness="0.22"
							color="deep-orange-10"
							track-color="grey-3"
							class="q-ma-md"
						>
							{{ props.row.calories }}%
						</q-knob>
						<div class="column items-start text-grey-5">
							<p>分区：/www</p>
							<p>0 B可用，共24.48 GB</p>
						</div>
					</q-td>
				</q-tr>
			</template>
		</q-table>
	</div>
</template>
<style scoped></style>
