<template>
  <div>
    <x-header title="注册页面"></x-header>
    <div>
      <msg :title='title' :description="description" :buttons="buttons" :icon="icon"></msg>
    </div>
  </div>
</template>

<script>
import { Msg, Divider, XButton ,XHeader} from 'vux'
export default {
  components: {
    Msg,
    Divider,
    XButton,
    XHeader
  },
  methods: {
    changeIcon () {
      if (!this.icon || this.icon === 'success') {
        this.icon = 'warn'
        return
      }
      if (this.icon === 'warn') {
        this.icon = 'info'
        return
      }
      if (this.icon === 'info') {
        this.icon = 'waiting'
        return
      }
      if (this.icon === 'waiting') {
        this.icon = 'success'
      }
    }
  },
  data () {
    return {
      title: this.$route.params.title,
      description: '内容详情',
      icon: this.$route.params.icon,
      buttons: [{
        type: 'primary',
        text: '确认',
        onClick: this.changeIcon.bind(this)
      }, {
        type: 'default',
        text: '返回',
        link: '/'
      }]
    }
  }
}
</script>