import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';
import { useCounterStore } from "src/stores/modules/permission";

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = typeof messages['zh-CN'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema { }

  // define the datetime format schema
  export interface DefineDateTimeFormat { }

  // define the number format schema
  export interface DefineNumberFormat { }
}
/* eslint-enable @typescript-eslint/no-empty-interface */
let i18n;
const appStore = useCounterStore();
export default boot(({ app }) => {
  i18n = createI18n({
    locale: appStore.getLocale || 'zh-CN',
    legacy: false,
    messages,
  });
  // Set i18n instance on app
  app.use(i18n);
});

