<template>
  <div
      class="m-select"
      :class="{disabled: disabled, open: open}"
      @click.stop>
    <label>
      <input
          ref="input"
          class="m-select-input"
          :class="placeholderClass"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          v-model="label"
          @click="openSelect"
          @blur="closeSelect">
      <i class="icon icon-select"></i>
    </label>
    <div
        class="m-option"
        v-show="open"
        @mousedown.prevent="chooseOption">
      <ul class="m-option-group">
        <li
            v-for="(item, index) of options"
            :key="index"
            :data-idx="index"
            class="m-select-option"
            :class="{'selected': pickIdx === index}">
          {{item | resolveLabel(labelAlias)}}
        </li>
        <li v-if="list.length === 0" class="m-select-option">加载中..</li>
      </ul>
    </div>
  </div>
</template>
<script type="text/babel">
  const UA = window.navigator.userAgent.toLowerCase()
  const isIE = UA && /msie|trident/.test(UA)
  export default{
    props: {
      list: {
        type: Array
      },
      labelAlias: {
        type: String,
        default: 'label'
      },
      placeholder: String,
      placeholderClass: String,
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      writeable: {
        type: Boolean,
        default: false
      },
      value: null
    },

    data () {
      return {
        open: false,
        label: '',
        prelabel: '',
        prevalue: '',
        pickIdx: -1
      }
    },

    computed: {
      options () {
        if (this.readonly || !this.label) {
          return this.list
        }
        return this.list.filter((item) => {
          return item[this.labelAlias].indexOf(this.label) > -1
        })
      }
    },

    watch: {
      // 数据回显
      value: {
        handler (val) {
          if (this.prevalue === val) return
          let list = this.options
          if (val && list) {
            each(list, (item, i) => {
              if (item === val || plainEqual(item, val)) {
                this.hanldeValue(item, i)
                return true
              }
            })
          }
        },
        immediate: true
      },

      // 当用户输入时, 动态改变选中的值
      options (list) {
        if (list && this.prevalue) {
          each(list, (item, i) => {
            if (item === this.prevalue || plainEqual(item, this.prevalue)) {
              this.pickIdx = i
              return true
            }
          })
        }
      }
    },

    filters: {
      resolveLabel (item, labelAlias) {
        return typeof item === 'string' ? item : item[labelAlias]
      }
    },

    methods: {
      // 防止用户输入,但没选中
      restore () {
        this.label = this.prelabel
      },

      hanldeValue (item, i) {
        this.prelabel = this.label = item[this.labelAlias]
        this.prevalue = item
        if (this.readonly) {
          this.pickIdx = i
        } else {
          this.pickIdx = 0
        }
      },

      autoSelect () {
        let list = this.options
        if (list && this.label) {
          each(list, (item) => {
            if (item[this.labelAlias] === this.label) {
              this.hanldeValue(item)
              this.$emit('input', item)
              return true
            }
          })
        }
      },

      openSelect () {
        if (!this.disabled) {
          this.open = !this.open
        }
      },

      closeSelect () {
        if (this.cancelBlur) {
          this.cancelBlur = false
          return
        }
        if (!this.disabled) {
          this.open = false
          if (!this.readonly) {
            // 对于输入不算的,只能点击选项选中
            // 失去焦点需要还原原来的值
            // 否则判断失去焦点输入的值和现有的值是否有相等的
            if (!this.writeable) {
              this.restore()
            } else {
              this.autoSelect()
            }
          }
        }
      },

      chooseOption (e) {
        // 当出现滚动条时, 点击滚动条不消失
        // IE下点击scrollbar会导致焦点移动到body
        if (e.target.tagName.toUpperCase() === 'DIV') {
          if (isIE) {
            this.cancelBlur = true
          }
        } else {
          let idx = parseInt(e.target.getAttribute('data-idx'))
          let item = this.options[idx]
          this.hanldeValue(item, idx)
          this.$emit('input', item)
          // 在失去焦点自动触发回调
          this.$refs.input.blur()
          if (isIE) {
            this.cancelBlur = false
            this.closeSelect()
          }
          // 在IE下input只读模式下,失去焦点会导致input清空
          if (isIE) {
            this.$nextTick(function () {
              this.prelabel = this.label = item[this.labelAlias]
            })
          }
        }
      }
    },

    mounted () {
      if (isIE) {
        document.addEventListener('click', (e) => {
          this.cancelBlur = false
          this.closeSelect()
        })
      }
    }
  }

  function plainEqual (a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  function each (list, cb) {
    for (let i = 0, len = list.length; i < len; i++) {
      if (cb(list[i], i)) {
        break
      }
    }
  }

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  ::-ms-clear, ::-ms-reveal {
    display: none;
  }

  // 图标
  .icon {
    box-sizing border-box
    display inline-block
    background url('data:image/png;base64,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') no-repeat
    font-style normal
    cursor pointer
    // select 的上下箭头
    &.icon-select {
      position absolute
      z-index 2
      right 10px
      top 50%
      margin-top -4px
      width 9px
      height 4px
      background-position -240px 0
    }
  }

  // 下拉选
  .m-select {
    position absolute
    left -1px
    top -1px
    width calc(100% + 2px)
    height calc(100% + 2px)
    font-size 12px
    &.disabled {
      .m-select-input {
        cursor not-allowed
      }
    }
    .m-select-input {
      position absolute
      display block
      width 100%
      height 100%
      line-height 1
      padding 3px 20px 3px 10px
      box-sizing border-box
      border 1px solid #e5e5e5
      appearance none
      background-color #ffffff
      background-image none
      color #1f2d3d
      font-size inherit
      outline none
    }

    &.open .m-select-input {
      border 1px solid #316ccb
      z-index 1
      + .icon-select {
        background-position -230px 0
      }
    }

    .m-option {
      position absolute
      z-index 3
      top 100%
      width 208px
      max-height 224px
      background #ffffff
      border 1px solid #e5e5e5
      box-shadow 0 0 16px 0 rgba(197, 197, 197, 0.50)
      overflow auto

      .m-option-group {
        list-style none
        padding 0
        margin 0
      }
      .m-select-option {
        padding 0 16px
        line-height 40px
        font-size 12px
        color #959595
        cursor pointer
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        &:hover,
        &.selected {
          color #316ccb
          background-color #f5f5f5
        }
      }
    }
  }

</style>
