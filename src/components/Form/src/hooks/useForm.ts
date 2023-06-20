// import type { UseFormReturnType } from '../types/form';
import { ref, onUnmounted, unref, nextTick, watch } from 'vue';

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return true;
}
// dynamic use hook props
export function getDynamicProps(props) {
  const ret = {};
  Object.keys(props).map((key) => {
    ret[key] = unref((props)[key]);
  });
  return ret;
}
export function useForm(props) {
  const formRef = ref(null);
  const loadedRef = ref(false);
  async function getForm() {
    const form = unref(formRef);
    if (!form) {
      console.log(123);
    }
    await nextTick();
    return form;
  }

  function register(instance) {
    isProdMode() &&
      onUnmounted(() => {
        formRef.value = null;
        loadedRef.value = null;
      });
    if (unref(loadedRef) && isProdMode() && instance === unref(formRef)) return;

    formRef.value = instance;
    loadedRef.value = true;

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true,
      },
    );
  }

  const methods = {
    async setProps(formProps: Partial<any>) {
      const form = await getForm();
      form.setProps(formProps);
    },
    submit: async (): Promise<any> => {
      const form = await getForm();
      return form.submit();
    },
  };
  return [register, methods];
}