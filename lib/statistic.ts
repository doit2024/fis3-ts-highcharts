const Highcharts = window.Highcharts
const Tpl = window.Tpl
const Ajax = window.Ajax
const mock = window.mock
const options = window.options

const page = {
  tongji: new Tpl({
    selector: '#tongji',
    data: {
      bushu: 3000,
      licheng: 3,
      reliang: 100
    },
    tmp: `<div class="item">
        <p>步数</p>
        <p><span class="data">{{bushu}}</span>步</p>
    </div>
    <div class="item">
        <p>里程</p>
        <p><span class="data">{{licheng}}</span>千米</p>
    </div>
    <div class="item">
        <p>热量</p>
        <p><span class="data">{{reliang}}</span>千卡</p>
    </div>`
  }),
  shichang: new Tpl({
    selector: '#shichang',
    data: {
      hours: 1,
      minutes: 10
    },
    tmp: `<b>时长</b>
    <b><span class="f-warn">{{hours}}</span>小时<span class="f-warn">{{minutes}}</span>分</b>`
  }),
  xinlv: new Tpl({
    selector: '#xinlv',
    data: {
      time: '10月2日 0:00', value: 80
    },
    tmp: `<p><b>{{time}}</b></p>
    <p><b>心率 <span class="f-p">{{value}}</span>mbp</b></p>`
  }),
  xinlvfanwei: new Tpl({
    selector: '#xinlvfanwei',
    data: {
      value: '80-120'
    },
    tmp: `{{value}}`
  }),
  sudu: new Tpl({
    selector: '#sudu',
    data: {
      time: '10月2日 0:00',
      value: 18
    },
    tmp: `<p><b>{{time}}</b></p>
    <p><b>速度 <span class="f-p">{{value}}</span>km/h</b></p>`
  }),
  pingjunsudu: new Tpl({
    selector: '#pingjunsudu',
    data: {
      value: '18'
    },
    tmp: `{{value}}`
  }),
  yinshui: new Tpl({
    selector: '#yinshui',
    data: {
      time: '10月2日 2:00',
      value: 0
    },
    tmp: `<p><b>{{time}}</b></p>
    <p><b>饮水量 <span class="f-p">{{value}}</span>L</b></p>`
  }),
  pingjunyinshui: new Tpl({
    selector: '#pingjunyinshui',
    data: {
      value: '0'
    },
    tmp: `{{value}}`
  }),
  daixie: new Tpl({
    selector: '#daixie',
    data: {
      time: '10月2日 0:00',
      value: 45
    },
    tmp: `<p><b>{{time}}</b></p>
    <p><b>代谢值 <span class="f-p">{{value}}</span>%</b></p>`
  }),
  pingjundaixie: new Tpl({
    selector: '#pingjundaixie',
    data: {
      value: '0'
    },
    tmp: `{{value}}`
  }),
}

Highcharts.chart('chartBar', options.getStatisticBar(mock.barMonth))
Highcharts.chart('chartPie', options.getPie(mock.pie))
Highcharts.chart('chartLineRulerXinLv', options.getLineRuler(mock.xinlv, updateDom('xinlv')))
Highcharts.chart('chartLineRulerPeiSu', options.getLineRuler(mock.peisu, updateDom('sudu')))
Highcharts.chart('chartLineRulerYinShui', options.getLineRuler(mock.yinshui, updateDom('yinshui')))
Highcharts.chart('chartLineRulerDaiXie', options.getLineRuler(mock.daixie, updateDom('daixie')))

// ajax参数
const keys = {
  timeType: '1'
}
// 日周月tab切换
document.getElementById('tab').addEventListener('click', handleTabClick)
function handleTabClick (e) {
  if (e.target.className === 'item') {
    [].slice.call(this.children).forEach(element => {
      element.classList.remove('active')
    })
    e.target.classList.add('active')
    updatePage(e.target.getAttribute('data-type'))
  }
}

function updatePage (type:string) {
  keys['timeType'] = type
  Ajax.getData(keys)
  let barType = ['barDay', 'barWeek', 'barMonth'][~~type - 1]
  Highcharts.chart('chartBar', options.getStatisticBar(mock[barType]))
  Highcharts.chart('chartPie', options.getPie(mock.pie))
  Highcharts.chart('chartLineRulerXinLv', options.getLineRuler(mock.xinlv, updateDom('xinlv')))
  Highcharts.chart('chartLineRulerPeiSu', options.getLineRuler(mock.peisu, updateDom('sudu')))
  Highcharts.chart('chartLineRulerYinShui', options.getLineRuler(mock.yinshui, updateDom('yinshui')))
  Highcharts.chart('chartLineRulerDaiXie', options.getLineRuler(mock.daixie, updateDom('daixie')))
}

function updateDom(id:string) {
  return (data) => {
    let time = `10月2日 ${data.target.x}:00`
    let value = data.target.y
    page[id].setData({time, value})
  }
}
