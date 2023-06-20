import type { Component } from 'vue';
import type { ComponentType } from './types/index';

/**
 * Component list, register here to setting it in the form
 */
import {
  QInput,
  QToggle,
  QDate,
  QTime
} from "quasar"

const componentMap = new Map<ComponentType, Component>();

componentMap.set('Input', QInput);
componentMap.set('Toggle', QToggle);
componentMap.set('QDate', QDate);
componentMap.set('Time', QTime);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
