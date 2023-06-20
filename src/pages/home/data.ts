export const columns = [
  { name: "host", label: "服务器ID", field: "host" },
  { name: "totalRAM", label: "总内存", field: "totalRAM" },
  {
    name: "availableRAM", label: "已用内存", field: row => {
      return {
        title: `${Number(row.availableRAM).toFixed(1)}/${Number(row.totalRAM).toFixed(1)}`,
        value: row.availableRAM / row.totalRAM
      }

    }
  },
  // { name: "residueRAM", label: "剩余内存", field: "residueRAM" },
  { name: "hardDiskTotal", label: "硬盘总容量", field: "hardDiskTotal" },
  // { name: "residueHardDisk", label: "硬盘剩余容量", field: "residueHardDisk" },

  {
    name: "hardDiskUsed", label: "硬盘已使用容量", field: row => {
      return {
        title: `${Number(row.hardDiskUsed).toFixed(1)}/${Number(row.hardDiskTotal).toFixed(1)}`,
        value: (row.hardDiskUsed / row.hardDiskTotal) || 0
      }

    }
  },
  { name: "hardDiskTotalC", label: "系统盘总容量", field: "hardDiskTotalC" },
  { name: "hardDiskUsedC", label: "系统盘已使用容量", field: "hardDiskUsedC" },
  { name: "hardDiskTotalD", label: "数据盘总容量", field: "hardDiskTotalD" },
  { name: "hardDiskUsedD", label: "数据盘已使用容量", field: "hardDiskUsedD" },
];

export const initialPagination = {
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 4
};

export const lineOption = {
  xAxis: {
    type: "category",
    data: ["1月", "2月", "3月", "4月", "5月", "6月"]
  },
  yAxis: {
    type: "value"
  },
  grid: [{ left: "14%", top: "7%", width: "84%", height: "80%" }],
  series: [
    {
      areaStyle: {
        normal: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              // 渐变颜色
              {
                offset: 0,
                color: "#014085"
              },
              {
                offset: 1,
                color: "rgba(3,42,85,.3)"
              }
            ]
          } //改变区域颜色
        }
      },
      data: [120, 232, 91, 34, 120, 130, 66],
      type: "line"
    }
  ]
};

export const barOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // Use axis to trigger tooltip
      type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {},
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: {
    type: "value"
  },
  yAxis: {
    type: "category",
    data: ["设备A", "设备2", "设备3", "设备4", "设备5", "设备6"]
  },
  series: [
    {
      name: "运行异样",
      type: "bar",
      stack: "total",
      label: {
        show: true
      },
      emphasis: {
        focus: "series"
      },
      data: [5, 11, 7, 12, 2, 0, 1]
    },
    {
      name: "缺少机油",
      type: "bar",
      stack: "total",
      label: {
        show: true
      },
      emphasis: {
        focus: "series"
      },
      data: [4, 0, 1, 7, 9, 0, 9]
    },
    {
      name: "缺少冷凝液",
      type: "bar",
      stack: "total",
      label: {
        show: true
      },
      emphasis: {
        focus: "series"
      },
      data: [2, 3, 5, 1, 0, 10, 0]
    },
    {
      name: "缺少B",
      type: "bar",
      stack: "total",
      label: {
        show: true
      },
      emphasis: {
        focus: "series"
      },
      data: [15, 1, 1, 4, 9, 4, 0]
    },
    {
      name: "消解异常",
      type: "bar",
      stack: "total",
      label: {
        show: true
      },
      emphasis: {
        focus: "series"
      },
      data: [2, 2, 1, 3, 3, 1, 13]
    }
  ]
};

export const radarOption = {
  legend: {
    data: ["设备A", "设备B"]
  },
  radar: {
    // shape: 'circle',
    center: ["50%", "62%"],
    indicator: [
      { name: "运行异样", max: 6500 },
      { name: "缺少机油", max: 16000 },
      { name: "缺少冷凝液", max: 30000 },
      { name: "缺少B", max: 38000 },
      { name: "消解异常", max: 52000 }
    ]
  },
  series: [
    {
      name: "Budget vs spending",
      type: "radar",
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: "设备A"
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: "设备B"
        }
      ]
    }
  ]
};

/**
 * @description: 数据转换
 */

export const dataConversion = (data: string) => {
  return (Number(data) / 1024 / 1024 / 1024).toFixed(4);
}