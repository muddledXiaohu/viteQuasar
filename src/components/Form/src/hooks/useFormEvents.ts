import { unref } from 'vue';
export function useFormEvents({
  emit,
  formModel,
  formElRef,
}: any) {

  async function validateFields(nameList?: [] | undefined) {
    return unref(formElRef)?.validateFields(nameList);
  }
  return {
    validateFields,
  };
}