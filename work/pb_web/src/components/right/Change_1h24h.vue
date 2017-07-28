<style>

</style>

<template>
  <div class="card hour-pick">
    <div class="card-action blue lighten-1 white-text">
      <i class="fa fa-exchange purple-text"></i> 1/24h切换
    </div>
    <div class="card-content">
      <!--<button class="waves-effect waves-light btn" @click="change_hour($event)">24h</button>-->
      <!--<button class="waves-effect waves-light btn" @click="change_hour($event)">1h</button>-->
      <div class="switch" style="text-align: center;">
        <label style="font-size: 1.4rem;">
          24h
          <input type="checkbox" checked v-model="hour" @change="change_hour()">
          <span class="lever"></span>
          1h
        </label>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        hour:false
      }
    },
    components:{
    },
    methods:{
      change_hour(){
        var hour = this.hour === false ? '24' : '1';
        console.log(hour)
        this.$store.commit('change_isoline_hour', {
          text: hour
        })
      }
    },
    mounted(){

    }
  }
</script>
