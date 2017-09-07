<template>
  <div>
    <h1>基本用法</h1>
    <VSelect
        v-model.sync="username"
        @selected="change"
        :size="users.length"
        placeholder="输入微信昵称进行搜索">
      <VOption
          v-for="item in users"
          :key="item.id"
          :selected="item.nickname === username"
          :value="item">
        <div class="search-item">
          <img class="avatar-url" :src="item.headImg">
          <span class="nickname nowrap">{{ item.nickname }}</span>
          <span class="address nowrap">{{item.address}}</span>
        </div>
      </VOption>
      <div v-show="users.length === 0 && username.length > 0" class="no-data-search" slot="nodata">
        没有找到记录，请确保该微信号访问过您的小钢店
      </div>
    </VSelect>
  </div>
</template>
<script type="text/babel">
  import {
    VSelect,
    VOption
  } from '../../index'
  export default{
    data: () => ({
      username: '',
      users: [
        {
          'id': 1,
          'nickname': 'Jade',
          'headImg': 'https://wx.qlogo.cn/mmopen/jUJzvz6CaLKMibJp2Y8EwgyCVCaic2SkgdE2hTaON7LibVGjQMS2STn2Sb0FaficXMXjoydtyj3FeVCM69k2Hr3BIvUcA4FQ0awK/0',
          'address': '北京'
        },
        {
          'id': 2,
          'nickname': 'Lisa',
          'headImg': 'https://wx.qlogo.cn/mmopen/jUJzvz6CaLKMibJp2Y8EwgyCVCaic2SkgdE2hTaON7LibVGjQMS2STn2Sb0FaficXMXjoydtyj3FeVCM69k2Hr3BIvUcA4FQ0awK/0',
          'address': '上海'
        }
      ]
    }),

    methods: {
      change () {

      }
    },

    components: {
      VSelect,
      VOption
    }
  }
</script>
