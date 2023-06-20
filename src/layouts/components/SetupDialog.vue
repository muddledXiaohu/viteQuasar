<script setup lang="ts" name="SetupDialog">
import { computed, watch, ref } from "vue";
import { useQuasar, setCssVar, getCssVar } from "quasar";
const $q = useQuasar();
// 设置暗色模式状态
$q.dark.set(false);
interface Props {
	alert: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	alert: () => false
});
const alertAlert = ref(false);
let darkValue = ref(false);
// 着色
const color = ref("#fff");
watch(
	() => darkValue.value,
	() => {
		$q.dark.toggle();
		if ($q.dark.isActive) {
			setCssVar("dark", "#000");
			color.value = "#000";
		} else {
			setCssVar("bgcHead", "#fff");
			color.value = "#fff";
		}
	}
);
watch(
	() => props.alert,
	() => {
		alertAlert.value = props.alert;
	}
);
watch(
	() => color.value,
	() => {
		// darkValue.value = true;
		setCssVar("bgcHead", color.value);
	}
);
const emit = defineEmits(["closeDialog"]);
/**
 * @description: 关闭
 */
const dialogHide = () => {
	emit("closeDialog");
};
</script>
<template>
	<q-dialog v-model="alertAlert" position="right" @hide="dialogHide">
		<q-card style="min-width: 300px; height: 100%">
			<q-card-section>
				<div class="text-subtitle2">项目配置</div>
			</q-card-section>
			<q-separator :color="$q.dark.mode ? '' : 'grey-3'" />
			<div class="q-mt-md">
				<div class="text-center">
					<div class="with-text">
						<span class="line"></span>
						<span>主题</span>
						<span class="line"></span>
					</div>
					<q-toggle v-model="darkValue" :color="$q.dark.mode ? 'white' : 'dark'" />
					<div class="with-text">
						<span class="line"></span>
						<span>系统主题</span>
						<span class="line"></span>
					</div>

					<div class="q-gutter-sm">
						<q-radio keep-color v-model="color" val="#fff" color="grey-11" />
						<q-radio keep-color v-model="color" val="#000" color="dark" />
						<q-radio keep-color v-model="color" val="#01579b" color="light-blue-13" />
						<q-radio keep-color v-model="color" val="#f57f17" color="amber-10" />
						<q-radio keep-color v-model="color" val="#33691e" color="light-green-10" />
					</div>
				</div>
			</div>
		</q-card>
	</q-dialog>
</template>

<style scoped lang="sass">
.with-text
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-around
.line
    width:100px
    border-top:1px solid #cccccc
    vertical-align:5px
</style>
