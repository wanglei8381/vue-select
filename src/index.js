import VueSelect from './Select.vue'
import Vue from 'vue'

/* eslint-disable no-new */
new Vue({
  el: '#app',

  data: {
    fruit: {
    },
    style: {margin: '100px auto', width: '200px', height: '30px', position: 'relative'},
    list: [
      {
        label: '苹果',
        value: '1'
      },
      {
        label: '香蕉1',
        value: '1'
      },
      {
        label: '香蕉2',
        value: '1'
      },
      {
        label: '香蕉3',
        value: '1'
      },
      {
        label: '香蕉4',
        value: '1'
      },
      {
        label: '香蕉5',
        value: '1'
      },
      {
        label: '香蕉6',
        value: '1'
      }
    ]
  },

  watch: {
    fruit (val) {
      console.log(JSON.stringify(val))
    }
  },

  components: {
    'vue-select': VueSelect
  }
})
