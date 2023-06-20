
import { ref, watchEffect, defineComponent } from 'vue';
import {
  QToggle,
  QCardSection,
  QForm,
  QHeader,
  QInput,
  QLayout,
  QPage,
  QPageContainer,
  QToolbar,
  QToolbarTitle
} from "quasar"
import { BasicForm, useForm } from 'src/components/Form/index';
export default defineComponent({
  emits: [],
  setup(props, context) {
    // context.emit("cancel");
    watchEffect(() => {
    });
    const [register] = useForm({
      labelWidth: 380,
      schemas: [
        {
          field: 'field1',
          component: 'Input',
          label: '字段1',
          componentProps: {
            // filled: true,
            // label: "字段1",
            hint: "介绍",
          }
        },
        {
          field: 'field2',
          component: 'Input',
          componentProps: {
            filled: true,
            label: "字段2",
            hint: "介绍",
          }
        },
        {
          field: 'field3',
          component: 'Toggle',
          label: '字段3',
          defaultValue: false,
          componentProps: {
            color: 'green',
          },
        },
        {
          field: 'field4',
          component: 'Toggle',
          defaultValue: false,
          componentProps: {
            filled: true,
            itemLabel: "字段4",
            color: 'green',
          },
        },
        {
          field: 'field5',
          component: 'Toggle',
          defaultValue: false,
          componentProps: {
            filled: true,
            itemLabel: "字段5",
            color: 'green',
          },
        },
        // {
        //   field: 'field5',
        //   component: 'QDate',
        //   label: '字段5',
        // },
        // {
        //   field: 'field6',
        //   component: 'Time',
        //   label: '字段6',
        // },
      ],
      actionColOptions: {
        span: 24,
      },
    });

    const formData = ref({
      name: '',
      toggle: false
    });
    const onSubmit = () => {
      console.log(123);
    }
    const onReset = () => {
      console.log(321);
    }
    return {
      formData,
      onSubmit,
      onReset,
      register,
    };
  },
  render() {
    const {
      register,
    } = this;
    return (
      <div>
        <BasicForm onRegister={register} />
      </div>
    )
  }
})