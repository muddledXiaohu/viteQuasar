export const columns = [
  { name: "id", label: "服务器ID", field: "id" },
  { name: "totalRAM", label: "总内存", field: "totalRAM" },
  { name: "availableRAM", label: "已用内存", field: "availableRAM" },
  { name: "residueRAM", label: "剩余内存", field: "residueRAM" },
  { name: "hardDiskTotal", label: "硬盘总容量", field: "hardDiskTotal" },
  { name: "hardDiskUsed", label: "硬盘已使用容量", field: "hardDiskUsed" },
  { name: "residueHardDisk", label: "硬盘剩余容量", field: "residueHardDisk" },
  { name: "hardDiskTotalC", label: "系统盘总容量", field: "hardDiskTotalC" },
  { name: "hardDiskTotalD", label: "数据盘总容量", field: "hardDiskTotalD" },
  { name: "hardDiskUsedC", label: "系统盘已使用容量", field: "hardDiskUsedC" },
  { name: "hardDiskUsedD", label: "数据盘已使用容量", field: "hardDiskUsedD" },
];

export const initialPagination = {
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 4
};
export const itemsData = () => {
  let itemBase = +new Date();
  const oneDay = 24 * 3600;
  const data = [[itemBase, Math.random() * 300]];
  for (let i = 1; i < 500; i++) {
    const now = new Date((itemBase += oneDay));
    data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
  }
  return data
}
export const itemsData1 = () => {
  let itemBase = +new Date();
  const oneDay = 24 * 3600;
  const data = [[itemBase, Math.random() * 300]];
  for (let i = 1; i < 500; i++) {
    const now = new Date((itemBase += oneDay));
    data.push([+now, Math.round((Math.random() - 0.4) * 20 + data[i - 1][1])]);
  }
  return data
}
export const itemsData2 = () => {
  let itemBase = +new Date();
  const oneDay = 24 * 3600;
  const data = [[itemBase, Math.random() * 300]];
  for (let i = 1; i < 500; i++) {
    const now = new Date((itemBase += oneDay));
    data.push([+now, Math.round((Math.random() - 0.2) * 20 + data[i - 1][1])]);
  }
  return data
}

export const lineOption = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  grid: [{ left: "6%", top: "7%", width: "90%", height: "75%" }],
  xAxis: {
    type: 'time',
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 20
    },
    {
      start: 0,
      end: 20
    }
  ],
  series: [
    {
      type: 'line',
      symbol: 'none',
      data: itemsData()
    }
  ]
};

export const barOption = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  grid: [{ left: "6%", top: "17%", width: "90%", height: "66%" }],
  xAxis: {
    type: 'time',
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
  },
  legend: {
    data: ['1分钟', '5分钟', '15分钟']
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 20
    },
    {
      start: 0,
      end: 20
    }
  ],
  series: [
    {
      name: '1分钟',
      type: 'line',
      symbol: 'none',
      data: itemsData()
    },
    {
      name: '5分钟',
      type: 'line',
      symbol: 'none',
      data: itemsData1()
    },
    {
      name: '15分钟',
      type: 'line',
      symbol: 'none',
      data: itemsData2()
    },
  ]
};

export const radarOption = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  grid: [{ left: "6%", top: "7%", width: "90%", height: "75%" }],
  xAxis: {
    type: 'time',
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 20
    },
    {
      start: 0,
      end: 20
    }
  ],
  series: [
    {
      type: 'line',
      symbol: 'none',
      data: itemsData()
    }
  ]
};

export const diskOption = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  grid: [{ left: "6%", top: "17%", width: "90%", height: "66%" }],
  xAxis: {
    type: 'time',
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
  },
  legend: {
    data: ['磁盘占用率', 'inodes占用率', '磁盘IO耗时占比/百分比']
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 20
    },
    {
      start: 0,
      end: 20
    }
  ],
  series: [
    {
      name: '磁盘占用率',
      type: 'line',
      symbol: 'none',
      data: itemsData()
    },
    {
      name: 'inodes占用率',
      type: 'line',
      symbol: 'none',
      data: itemsData1()
    },
    {
      name: '磁盘IO耗时占比/百分比',
      type: 'line',
      symbol: 'none',
      data: itemsData2()
    },
  ]
};
/**
 * @description: 数据转换
 */

export const dataConversion = (data: string) => {
  return (Number(data) / 1024 / 1024 / 1024).toFixed(4);
}

export const tooltipColumns = [
  {
    name: 'name',
    label: '服务器',
    align: 'left',
  },
  { name: 'calories', align: 'center', label: '硬盘状态' }
]
