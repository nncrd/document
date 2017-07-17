<template>
  <div>
    <div style="padding:15px;">
      <input type="text" placeholder="地点">
      <input type="text" placeholder="单位">
      <input type="text" placeholder="手机号">
      <input type="text" placeholder="姓名">	    
      <x-button @click.native="showPlugin" type="primary">提交</x-button>
    </div>
     <div v-transfer-dom v-show="show1">
      <confirm v-model="show"
      :title = "title"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;">内容</p>
      </confirm>
    </div>   
  </div>
</template>
<style scoped>
@import '../assets/css/RegisterStaff.css'
</style>
<script>
import { Confirm, XButton ,TransferDomDirective as TransferDom} from 'vux'
export default{
  directives: {
    TransferDom
  },
  components: {
    XButton,
    Confirm
  },
  data () {
    return {
      show: false,
      show1:false,
      title:"提示"
    }
  },
  methods: {
    onCancel () {
      console.log('on cancel')
    },
    onConfirm (msg) {
      console.log('on confirm')
      if (msg) {
        alert(msg)
      }
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    showPlugin () {
      this.show1 = true;
      this.show = true;
    }
  }
}
</script>