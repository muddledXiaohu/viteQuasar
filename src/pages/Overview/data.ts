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

export const lineOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: "CPU使用率: {c0}%<br />所在服务器：{b0}",
  },
  grid: [{ left: "18%", top: "7%", width: "84%", height: "80%" }],
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    axisTick: {
      // 轴刻度
      show: false,
    },
    axisLine: {
      // 轴线
      show: false,
    },
    data: ['服务器1', '服务器2', '服务器3', '服务器4', '服务器5', '服务器6',]
  },
  series: [
    {
      type: 'bar',
      itemStyle: {
        normal: {
          color: '#5087eb'
        }
      },
      barWidth: 10,
      data: [1, 2, 2, 10, 13, 9]
    }
  ]
};

export const barOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: "内存使用率: {c0}%<br />所在服务器：{b0}",
  },
  grid: [{ left: "18%", top: "7%", width: "84%", height: "80%" }],
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    axisTick: {
      // 轴刻度
      show: false,
    },
    axisLine: {
      // 轴线
      show: false,
    },
    data: ['服务器1', '服务器2', '服务器3', '服务器4', '服务器5', '服务器6',]
  },
  series: [
    {
      type: 'bar',
      itemStyle: {
        normal: {
          color: '#5087eb'
        }
      },
      barWidth: 10,
      data: [21, 42, 12, 50, 13, 9]
    }
  ]
};

export const radarOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: "下行: {c1}KB <br />上行: {c0}KB <br />所在服务器：{b0}",
  },
  grid: [{ left: "18%", top: "7%", width: "84%", height: "80%" }],
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    axisTick: {
      // 轴刻度
      show: false,
    },
    axisLine: {
      // 轴线
      show: false,
    },
    data: ['服务器1', '服务器2', '服务器3', '服务器4', '服务器5', '服务器6',]
  },
  series: [
    {
      type: 'bar',
      name: '上行',
      stack: 'total',
      itemStyle: {
        normal: {
          color: '#5087eb'
        }
      },
      barWidth: 10,
      data: [21, 42, 12, 50, 13, 9]
    },
    {
      type: 'bar',
      name: '下行',
      stack: 'total',
      itemStyle: {
        normal: {
          color: '#91cc75'
        }
      },
      barWidth: 10,
      data: [15, 2, 9, 11, 3, 5]
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

export const giveAnAlarmRows = [
  {
    name: "服务器",
    width: '40%'
  },
  {
    name: "告警时间",
    width: '40%'
  },
  {
    name: "级别",
    width: '20%'
  },
]
export const SSHRows = [
  {
    name: "服务器",
    width: '40%'
  },
  {
    name: "登录IP",
    width: '20%'
  },
  {
    name: "登录时间",
    width: '40%'
  },
]
export const commandRows = [
  {
    name: "服务器",
    width: '40%'
  },
  {
    name: "执行时间",
    width: '30%'
  },
  {
    name: "命令",
    width: '30%'
  },
]
export const giveAnAlarmColumns = [{
  title: '服务器A',
  date: '2020-05-05',
  hot: '紧急'
}, {
  title: '服务器Acwqe',
  date: '2020-05-02',
  hot: '一般'
}, {
  title: 'A01-cdes',
  date: '2020-05-02',
  hot: '一般'
}, {
  title: 'A01-cdes',
  date: '2020-04-25',
  hot: '一般'
}, {
  title: 'A01-cdes',
  date: '2020-04-21',
  hot: '特急'
}, {
  title: '服务器Acwqe',
  date: '2020-04-20',
  hot: '一般'
}, {
  title: '服务器BBBB',
  date: '2020-04-01',
  hot: '一般'
}, {
  title: '服务器CCCCCCC',
  date: '2020-03-25',
  hot: '一般'
}, {
  title: '服务器ddddddddddddddd',
  date: '2020-03-16',
  hot: '一般'
}, {
  title: '服务器ee',
  date: '2020-03-12',
  hot: '紧急'
}, {
  title: '服务器123',
  date: '2020-02-28',
  hot: '紧急'
}, {
  title: '服务器123服务器123',
  date: '2020-02-15',
  hot: '一般'
}, {
  title: '服务器123123321123',
  date: '2020-02-10',
  hot: '一般'
}, {
  title: '服务器1045',
  date: '2020-02-08',
  hot: '一般'
}]


export const SSHColumns = [{
  title: '服务器A',
  date: '****',
  hot: '2020-05-05'
}, {
  title: '服务器Acwqe',
  date: '****',
  hot: '2020-05-02'
}, {
  title: 'A01-cdes',
  date: '****',
  hot: '2020-05-02'
}, {
  title: 'A01-cdes',
  date: '****',
  hot: '2020-04-25'
}, {
  title: 'A01-cdes',
  date: '****',
  hot: '2020-04-21'
}, {
  title: '服务器Acwqe',
  date: '****',
  hot: '2020-04-20'
}, {
  title: '服务器BBBB',
  date: '****',
  hot: '2020-04-01'
}, {
  title: '服务器CCCCCCC',
  date: '****',
  hot: '2020-03-25'
}, {
  title: '服务器ddddddddddddddd',
  date: '****',
  hot: '2020-03-16'
}, {
  title: '服务器ee',
  date: '****',
  hot: '2020-03-12'
}, {
  title: '服务器123',
  date: '****',
  hot: '2020-02-28'
}, {
  title: '服务器123服务器123',
  date: '****',
  hot: '2020-02-15'
}, {
  title: '服务器123123321123',
  date: '****',
  hot: '2020-02-10'
}, {
  title: '服务器1045',
  date: '****',
  hot: '2020-02-08'
}]

export const commandColumns = [{
  title: '服务器A',
  date: '2020-05-05',
  hot: '****'
}, {
  title: '服务器Acwqe',
  date: '2020-05-02',
  hot: '****'
}, {
  title: 'A01-cdes',
  date: '2020-05-02',
  hot: '****'
}, {
  title: 'A01-cdes',
  date: '2020-04-25',
  hot: '****'
}, {
  title: 'A01-cdes',
  date: '2020-04-21',
  hot: '****'
}, {
  title: '服务器Acwqe',
  date: '2020-04-20',
  hot: '****'
}, {
  title: '服务器BBBB',
  date: '2020-04-01',
  hot: '****'
}, {
  title: '服务器CCCCCCC',
  date: '2020-03-25',
  hot: '****'
}, {
  title: '服务器ddddddddddddddd',
  date: '2020-03-16',
  hot: '****'
}, {
  title: '服务器ee',
  date: '2020-03-12',
  hot: '****'
}, {
  title: '服务器123',
  date: '2020-02-28',
  hot: '****'
}, {
  title: '服务器123服务器123',
  date: '2020-02-15',
  hot: '****'
}, {
  title: '服务器123123321123',
  date: '2020-02-10',
  hot: '****'
}, {
  title: '服务器1045',
  date: '2020-02-08',
  hot: '****'
}]
