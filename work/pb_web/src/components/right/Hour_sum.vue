<style>

</style>

<template>
  <div class="card hour-sum">
    <div class="card-action blue lighten-1 white-text">
      <i class="fa fa-calendar purple-text"></i> 累计雨量时间
    </div>
    <div class="card-content">

      <div>
        <p><i class="fa fa-skyatlas purple-text"></i> 选择时间 <i class="fa fa-skyatlas purple-text"></i></p>
        <select class="browser-default">
          <option value="1">累计1小时</option>
          <option value="3">累计3小时</option>
          <option value="6">累计6小时</option>
          <option value="12">累计12小时</option>
          <option value="24">累计24小时</option>
          <option value="36">累计36小时</option>
          <option value="48">累计48小时</option>
          <option value="72">累计72小时</option>
          <option value="96">累计96小时</option>
          <option value="120">累计120小时</option>
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
