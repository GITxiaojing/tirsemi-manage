export default {
  mixins: [{
    data() {
      return {
        firstName: 'test',
      }
    },
  }],
  data() {
    return {
      firstName: 'xiaojing',
    }
  },
  created() {
    console.log(2222)
  },
  methods: {
    test() {
      console.log('mixins')
    },
  },
}
