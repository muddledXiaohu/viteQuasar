<template>
	<div class="q-pa-md">
		<q-form @keypress.enter="handleEnterPress" class="q-gutter-md row flex items-center" ref="formElRef">
			<template v-for="schema in getSchema" :key="schema.field">
				<FormItem
					:formActionType="formActionType"
					:schema="schema"
					:setFormModel="setFormModel"
					:formModel="formModel"
					:allDefaultValues="defaultValueRef"
					:formProps="getProps"
				>
				</FormItem>
			</template>
		</q-form>
	</div>
</template>
<script lang="ts">
import { useQuasar } from "quasar";
import type { FormProps } from "./types/form";
import { ref, defineComponent, onMounted, computed, unref, reactive, watch } from "vue";
import { basicProps } from "./props";
import { cloneDeep } from "lodash-es";
import FormItem from "./components/FormItem.tsx";
import { dateUtil } from "src/utils/dateUtil";
import { deepMerge } from "src/utils/index";
import { isFunction, isArray } from "src/utils/is";
import { useFormEvents } from "./hooks/useFormEvents";
import { useFormValues } from "./hooks/useFormValues";
import { dateItemType } from "./helper";
import { log } from "console";

export default defineComponent({
	name: "BasicForm",
	components: { FormItem },
	emits: ["register", "field-value-change"],
	props: basicProps,
	setup(props, { emit, attrs }) {
		const $q = useQuasar();
		const name = ref("");
		const formModel = reactive({});

		const defaultValueRef = ref<any>({});
		const propsRef = ref<Partial<any>>({});
		const schemaRef = ref(null);
		const formElRef = ref(null);

		const { validateFields } = useFormEvents({
			emit,
			formModel,
			formElRef
		});
		async function setProps(formProps: Partial<any>): Promise<void> {
			propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
		}

		function setFormModel(key: string, value: any, schema: any) {
			formModel[key] = value;
			const { validateTrigger } = unref(getBindValue);

			if (isFunction(schema.dynamicRules) || isArray(schema.rules)) {
				return;
			}
			if (!validateTrigger || validateTrigger === "change") {
				validateFields([key]).catch(_ => {});
			}
			emit("field-value-change", key, value);
		}

		const handleEnterPress = e => {
			console.log(e);
		};
		const handleSubmit = () => {
			console.log(123);
		};
		const formActionType = {
			setProps,
			submit: handleSubmit
		};
		const getProps = computed((): FormProps => {
			return { ...props, ...unref(propsRef) } as FormProps;
		});

		const getBindValue = computed(() => ({ ...attrs, ...props, ...unref(getProps) }));
		const getSchema = computed((): [] => {
			const schemas: [] = unref(schemaRef) || (unref(getProps).schemas as any);
			for (const schema of schemas) {
				const { defaultValue, component, isHandleDateDefaultValue = true } = schema;
				// handle date type
				if (isHandleDateDefaultValue && defaultValue && dateItemType.includes(component)) {
					if (!Array.isArray(defaultValue)) {
						schema.defaultValue = dateUtil(defaultValue);
					} else {
						const def: any[] = [];
						defaultValue.forEach(item => {
							def.push(dateUtil(item));
						});
						schema.defaultValue = def;
					}
				}
			}
			if (unref(getProps).showAdvancedButton) {
				return cloneDeep(schemas.filter(schema => schema.component !== "Divider") as []);
			} else {
				return cloneDeep(schemas as []);
			}
		});

		const { initDefault } = useFormValues({
			defaultValueRef,
			getSchema,
			formModel
		});

		watch(
			() => getSchema.value,
			schema => {
				if (schema?.length) {
					initDefault();
				}
			}
		);
		onMounted(() => {
			initDefault();
			emit("register", formActionType);
		});
		return {
			name,
			handleEnterPress,
			getProps,
			getSchema,
			setFormModel,
			formModel,
			defaultValueRef,
			formActionType
		};
	}
});
</script>

<style lang="scss" scoped></style>
