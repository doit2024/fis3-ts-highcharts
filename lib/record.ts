const Highcharts = window.Highcharts
const Tpl = window.Tpl
const Ajax = window.Ajax
const mock = window.mock
const options = window.options
const datePicker = window.datePicker

const page = {
  /**
   * 进度条
   */
  progress: new Tpl({
    selector: '#progress',
    data: {
      total: 8.0,
      percent: 60
    },
    tmp: `<div class="progress-total">{{total}}km</div>
    <div class="progress-dash">
        <div class="progress-inner" style="width: {{percent}}%"></div>
    </div>`
  }),
  /**
   * 柱状图选中的时间
   */
  selected: new Tpl({
    selector: '#selected',
    data: () => {
      let now = new Date().getHours()
      return {
        value: `${now - 1}:00 - ${now}:00`
      }
    },
    tmp: `{{value}}`
  }),
  tongji: new Tpl({
    selector: '#tongji',
    data: {
      bushu: 3000 + ~~(3000 * Math.random()),
      licheng: 3 + ~~(3 * Math.random()),
      reliang: 100 + ~~(100 * Math.random())
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
}

Highcharts.chart('chartBar', options.getBar(mock.bar, updateSelected))
Highcharts.chart('chartLineXinLv', options.getLine(mock.xinlv))
Highcharts.chart('chartLinePeiSu', options.getLine(mock.peisu))
Highcharts.chart('chartLineYinShui', options.getLine(mock.yinshui))
Highcharts.chart('chartLineDaiXie', options.getLine(mock.daixie))
function updateSelected (e) {
  page.selected.setData({value: e.point.name})
}
/**
 * 页顶的时间选择器
 */
const domDp = document.getElementById('datepicker')
let calendar = new datePicker()
calendar.init({
  'trigger': '#datepicker', /*选择器，触发弹出插件*/
  'type': 'date',/*date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择*/
  'minDate':'2017-1-1',/*最小日期*/
  'maxDate':new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),/*最大日期*/
  'onSubmit':function(){
    let cv = calendar.value
    var overTime = Date.now() - Date.parse(calendar.value)
    var overHours = 8 + overTime / 1000 / 60 / 60
    if (overHours < 24) {
      domDp.value = '今天'
    }
    Highcharts.chart('chartBar', options.getBar(mock.bar, updateSelected))
    Highcharts.chart('chartLineXinLv', options.getLine(mock.xinlv))
    Highcharts.chart('chartLinePeiSu', options.getLine(mock.peisu))
    Highcharts.chart('chartLineYinShui', options.getLine(mock.yinshui))
    Highcharts.chart('chartLineDaiXie', options.getLine(mock.daixie))
    page.tongji.setData({
      bushu: 3000 + ~~(3000 * Math.random()),
      licheng: 3 + ~~(3 * Math.random()),
      reliang: 100 + ~~(100 * Math.random())
    })
  },
  'onClose':function(){/*取消时触发事件*/
  }
})