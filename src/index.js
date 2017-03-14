/* eslint-disable no-unused-vars */
import VueSelect from './Select.vue'
import Vue from 'Vue'

/* eslint-disable no-new */
new Vue({
  el: '#app',

  render (h) {
    let style = {margin: '100px auto', width: '200px', height: '30px', position: 'relative'}

    let data = [
      {
        label: '苹果',
        value: '1'
      },
      {
        label: '香蕉',
        value: '1'
      }
    ]

    return (
      <div style={style}>
        <VueSelect list={data}></VueSelect>
      </div>
    )
  }
})
