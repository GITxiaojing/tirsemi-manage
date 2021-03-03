<template>
  <div class="app">
    <!-- <div id="app"></div>
    <div>{{ firstName }} {{ lastName }}</div> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue.esm.js'
import mixin from './mixins'

const extend = {
  template: '<h1>hello</h1>',
  data() {
    return {
      firstName: 'jingsen',
      lastName: 'da'
    }
  },
  created () {
    console.log(11111)
    this.test()
  },
  methods: {
    test () {
      console.log('extends')
    }
  }
}

const extend1 = {
  template: '<h1>hello</h1>',
  data() {
    return {
      firstName: 'jingsen',
      lastName: 'da'
    }
  },
  created () {
    console.log(555)
    this.test()
  },
  methods: {
    test () {
      console.log('extends1')
    }
  }
}

const Profile = Vue.extend({
      template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
      props: {
        test: Boolean
      },
      data: function () {
        return {
          firstName: 'Walter',
          lastName: 'White',
          alias: 'Heisenberg'
        }
      }
    })

    const foo = new Profile()

export default {
  name: 'App',
  mixins: [mixin],
  customOption: 'foo',
  extends: [extend, extend1],
  data () {
    return {
      // firstName: 'jiasen',
      lastName: 'lin'
    }
  },
  mounted () {
    // var Profile = Vue.extend({
    //   template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    //   props: {
    //     test: Boolean
    //   },
    //   data: function () {
    //     return {
    //       firstName: 'Walter',
    //       lastName: 'White',
    //       alias: 'Heisenberg'
    //     }
    //   }
    // })
    // // 创建 Profile 实例，并挂载到一个元素上。
    // new Profile().$mount('#app')
  },
  methods: {
    test () {
      console.log('app')
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body,
.app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
