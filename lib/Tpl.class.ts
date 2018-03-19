class Tpl {
  data = {}
  el:Element
  tmp: string
  constructor (options = {selector: '', tmp: '', data: {} || (() => {})}) {
    let data = typeof options.data === 'function' ? options.data() : options.data
    this.el = document.querySelector(options.selector)
    this.tmp = options.tmp
    this.setData(data)
  }
  setData (data:object) {
    this.data = {...this.data, ...data}
    this.update()
  }
  update () {
    this.el.innerHTML = this.tmp.replace(/\{\{(\w+)\}\}/g, (a, b) => this.data[b])
  }
}
