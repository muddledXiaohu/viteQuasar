<script lang="ts">
import { ref } from "vue";
export default {
	emits: ["change"],
	setup() {
		// const [state] = useRuleFormItem(props, 'value', 'change', emitData);
		return {
			state: ref("2019/02/01")
		};
	}
};
</script>
<template>
	<div>
		<q-input filled v-model="state" mask="date" :rules="['date']">
			<template v-slot:append>
				<q-icon name="event" class="cursor-pointer">
					<q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
						<q-date v-model="state">
							<div class="row items-center justify-end">
								<q-btn v-close-popup label="Close" color="primary" flat />
							</div>
						</q-date>
					</q-popup-proxy>
				</q-icon>
			</template>
		</q-input>
	</div>
</template>
