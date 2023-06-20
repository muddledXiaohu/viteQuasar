
const DATE_TYPE = ['QDate', 'Time', 'WeekPicker', 'TimePicker'];
function genType() {
  return [...DATE_TYPE, 'RangePicker'];
}
/**
 * 时间字段
 */
export const dateItemType = genType();