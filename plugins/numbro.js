import Vue from 'vue'
import numbro from 'numbro'

function followersFormat(Vue) {
  Vue.filter('followersFormat', function(value) {
    return numbro(value).format({
      average: true
    })
  })
}
export default () => {
  Vue.use(followersFormat)
}
