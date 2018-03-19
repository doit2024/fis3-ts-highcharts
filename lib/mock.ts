const today = new Date().getTime()
let mock = {
  bar: Array.from({length: 24}, (item, i)=>([`${i}:00-${i+1}:00`, ~~(100 * Math.random()/10)+2])),
  barDay: {
    type: 'day',
    labelx: 15,
    data: Array.from({length: 30}, (item,i)=>([Date.now() - (29 - i) * 24*60*60*1000, i + ~~(100 * Math.random())]))
  },
  barWeek: {
    type: 'week',
    labelx: 0,
    data: Array.from({length: 30}, (item,i)=>([Date.now() - (29 - i) * 7*24*60*60*1000, i + ~~(100 * Math.random())]))
  },
  barMonth: {
    type: 'month',
    labelx: -27,
    data: Array.from({length: 30}, (item,i)=>([Date.now() - (29 - i) * 30*24*60*60*1000, i + ~~(100 * Math.random())]))
  },
  xinlv: {
      name: '心率',
      themeColor: '#fe2b5f',
      data: getData({
        xNum: 25,
        yRange: [80, 160],
        color: 'red'
      })
  },
  peisu: {
      name: '配速',
      themeColor: '#4098e2',
      data: getData({
        xNum: 25,
        yRange: [0, 20],
        color: 'blue'
      })
  },
  yinshui: {
      name: '饮水',
      themeColor: '#00d977',
      data: getData({
        xNum: 25,
        yRange: [0, 8],
        color: 'green'
      })
  },
  daixie: {
      name: '代谢',
      themeColor: '#fe2b5f',
      data: getData({
        xNum: 25,
        yRange: [0, 100],
        color: 'red'
      })
  },
  pie: [
    ['无氧', 45.0],
    ['强有氧', 26.8],
    ['中等有氧', 12.8],
    ['燃脂', 8.5],
    ['轻量燃脂', 6.2],
    ['不在区间', 3.7]
  ]
}

interface Condition {
  xNum: number,
  yRange: number[],
  color: string
}

function getData(params:Condition) {
  return Array.apply(null, Array(params.xNum)).map((item,i)=> {
    var result
    var y = params.yRange[0] + Math.ceil(Math.random() * (params.yRange[1] - params.yRange[0]))
    if (i === 0 || i === params.xNum - 1) {
      result = {
        y: y,
        marker: {
          fillColor: params.color,
          radius: 2,
          enabled: true
        }
      }
    } else {
      result = [`${i}:00`, y]
    }
    return result
  })
}
