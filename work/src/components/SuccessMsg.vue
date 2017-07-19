<template>
  <div>
    <x-header title="注册页面"></x-header>
    {{data}}
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
      data:'111',
      description: 'msg description',
      icon: '',
      buttons: [{
        type: 'primary',
        text: 'primary button',
        onClick: this.changeIcon.bind(this)
      }, {
        type: 'default',
        text: 'secondary button',
        link: '/demo'
      }]
    }
  }
}
</script>