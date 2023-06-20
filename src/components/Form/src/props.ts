export const basicProps = {
  // 标签宽度  固定宽度
  labelWidth: {
    type: [Number, String],
    default: 0,
  },
  // 操作列Col配置
  actionColOptions: Object,
  // 表单配置规则
  schemas: {
    type: Array,
    default: () => [],
  },
}