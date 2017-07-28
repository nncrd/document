<style>

</style>

<template>
  <div class="card hour-pick">
    <div class="card-action blue lighten-1 white-text">
      <i class="fa fa-calendar purple-text"></i> 预报时间选择
    </div>
    <div class="card-content">

      <div>
        <p><i class="fa fa-skyatlas purple-text"></i> 选择时间 <i class="fa fa-skyatlas purple-text"></i></p>
        <select class="browser-default">
          <option value="1">未来1小时</option>
          <option value="12">未来12小时</option>
          <option value="24">未来24小时</option>
        </select>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {}
    },
    components:{
    },
    mounted(){

    }
  }
</script>
