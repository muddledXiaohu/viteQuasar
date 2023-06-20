import { isNullOrUnDef } from 'src/utils/is';
import { unref } from 'vue';
import { cloneDeep, set } from 'lodash-es';
export function useFormValues({
  defaultValueRef,
  getSchema,
  formModel,
}: any) {

  function initDefault() {
    const schemas = unref(getSchema);
    const obj: Recordable = {};
    schemas.forEach((item) => {
      const { defaultValue } = item;

      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue;

        if (formModel[item.field] === undefined) {
          formModel[item.field] = defaultValue;
        }
      }
    });
    defaultValueRef.value = cloneDeep(obj);
  }

  return { initDefault };
}