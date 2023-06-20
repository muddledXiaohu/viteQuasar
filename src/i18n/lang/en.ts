import { genMessage } from '../helper';

const modules = import.meta.globEager('./en-US/**/*.ts');
export default {
  ...genMessage(modules, 'en-US'),
};
