
import { ref, watchEffect, defineComponent, toRefs, unref, computed } from 'vue';
import type { PropType, Ref } from 'vue';
import { cloneDeep, upperFirst } from 'lodash-es';
import { componentMap } from '../componentMap';
import { isFunction, isBoolean, isNumber } from 'src/utils/is';
import { dateItemType } from "../helper";
import {
	QItem,
	QItemSection,
	QItemLabel,
} from "quasar"
export default defineComponent({
	emits: [],

	props: {
		schema: {
			type: Object as PropType<any>,
			default: () => ({}),
		},
		formProps: {
			type: Object as PropType<any>,
			default: () => ({}),
		},
		allDefaultValues: {
			type: Object as PropType<any>,
			default: () => ({}),
		},
		formModel: {
			type: Object as PropType<any>,
			default: () => ({}),
		},
		setFormModel: {
			type: Function as PropType<(key: string, value: any, schema: any) => void>,
			default: null,
		},
		formActionType: {
			type: Object as PropType<any>,
		},
	},
	setup(props, context) {
		// context.emit("cancel");
		watchEffect(() => {
		});

		const { schema, formProps } = toRefs(props) as {
			schema: Ref<any>;
			formProps: Ref<any>;
		};

		const getValues = computed(() => {
			const { allDefaultValues, formModel, schema } = props;
			const { mergeDynamicData } = props.formProps;
			return {
				field: schema.field,
				model: formModel,
				values: {
					...mergeDynamicData,
					...allDefaultValues,
					...formModel,
				},
				schema: schema,
			};
		});

		const getComponentsProps = computed(() => {
			const { schema, formModel, formActionType } = props;
			let { componentProps = {} } = schema;
			if (isFunction(componentProps)) {
				componentProps = componentProps({ schema, formModel, formActionType }) ?? {};
			}
			if (schema.component === 'Divider') {
				componentProps = Object.assign({ type: 'horizontal' }, componentProps, {
					orientation: 'left',
					plain: true,
				});
			}
			return componentProps;
		});


		const getDisable = computed(() => {
			const { disabled: globDisabled } = props.formProps;
			const { dynamicDisabled } = props.schema;
			const { disabled: itemDisabled = false } = unref(getComponentsProps);

			let disabled = !!globDisabled || itemDisabled;
			if (isBoolean(dynamicDisabled)) {
				disabled = dynamicDisabled;
			}
			if (isFunction(dynamicDisabled)) {
				disabled = dynamicDisabled(unref(getValues));
			}

			return disabled;
		});

		const renderComponent = () => {
			const {
				component,
				field,
				changeEvent = 'Update:modelValue',
				valueField,
				componentProps = {},
			} = props.schema;
			const isCheck = component && ['Toggle', 'Checkbox'].includes(component);
			const eventKey = `on${upperFirst(changeEvent)}`;
			const on = {
				[eventKey]: (...args: any) => {
					const [e] = args;
					if (propsData[eventKey]) {
						propsData[eventKey](...args);
					}
					const target = e ? e.target : null;
					const value = target ? (isCheck ? target.modelValue : target.modelValue) : e;
					props.setFormModel(field, value, props.schema);
				},
			};
			const Comp = componentMap.get(component) as ReturnType<typeof defineComponent>;
			// const { autoSetPlaceHolder } = props.formProps;

			const { ClassProps = [] } = props.schema;
			const { baseClassProps = [] } = props.formProps;
			const realClassProps = [...['col'], ...baseClassProps, ...ClassProps];
			const propsData = {
				allowClear: true,
				getPopupContainer: (trigger: Element) => trigger.parentNode,
				...unref(getComponentsProps),
				// disabled: unref(getDisable),
				class: realClassProps
			};
			/**
				const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder;
				if (isCreatePlaceholder && component !== 'RangePicker' && component) {
					propsData.placeholder =
						unref(getComponentsProps)?.placeholder || createPlaceholderMessage(component);
				}
			 */
			propsData.codeField = field;
			propsData.formValues = unref(getValues);
			const bindValue = {
				[valueField || (isCheck ? 'modelValue' : 'modelValue')]: props.formModel[field],
			};
			const compAttr = {
				...propsData,
				...on,
				...bindValue,
			};
			if (isCheck && componentProps?.filled) {
				return <QItem tag="label" class="q-pa-none row flex items-center" style='width:100%;'>
					<QItemSection class="col-3 q-pl-sm">
						<QItemLabel>{componentProps?.itemLabel}:</QItemLabel>
					</QItemSection>
					<QItemSection class="no-margin col">
						<Comp {...compAttr}></Comp>
					</QItemSection>
				</QItem>
			}
			return <Comp {...compAttr}></Comp>
		}

		function renderLabelHelpMessage() {
			const { label, helpMessage, helpComponentProps, subLabel } = props.schema;
			if (!label) {
				return
			}
			const renderLabel = subLabel ? (
				<span>
					{label} <span class="text-secondary">{subLabel}</span>
				</span>
			) : (
				label
			);
			const getHelpMessage = isFunction(helpMessage)
				? helpMessage(unref(getValues))
				: helpMessage;
			if (!getHelpMessage || (Array.isArray(getHelpMessage) && getHelpMessage.length === 0)) {
				return <span class="col-3">{renderLabel}:</span>;
			}
			return (
				<span>
					{renderLabel}:
				</span>
			);
		}

		const renderItem = () => {
			const className = ref('')
			const { labelWidth } = schema.value;
			const { labelWidth: globalLabelWidth } = formProps.value;
			let width = labelWidth || globalLabelWidth;
			if (width) {
				width = isNumber(width) ? `${width}px` : width;
			}
			if (dateItemType.includes(schema.value?.component)) {
				className.value = 'row flex'
			} else {
				className.value = 'row flex items-center'
			}
			return (
				<div class={className.value} style={{ width }}>
					{renderLabelHelpMessage()}
					{renderComponent()}
				</div>
			)
		}
		return {
			renderItem
		};
	},
	render() {
		const {
			renderItem
		} = this;

		return (
			renderItem()
		)
	}
})