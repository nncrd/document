<template>
  <div class="header">
    <div class="headerInfo">
      <div class="headerTitle"><img src="./../../static/images/logo.png">
        交通气象运输服务系统
      </div>
      <div class="headerContent">
        <span>{{ city }}</span>
        <span>{{ tmp }}°C</span>
        <span>{{ txt }}</span>
        <img v-bind:src="imgUrl"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      ajaxAddr:"http://192.168.1.105:8090",
      city:"",
      tmp:"",
      imgUrl:"",
      txt:""
    }
  },
  methods:{
    getLocation(){
      var _this=this
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          axios({
            method: 'post',
            url: _this.ajaxAddr+'/weather/get-weatherNowData-byLocation?location='+r.point.lng+','+r.point.lat,
            data: {

            }
          }).then(function (response) {
              var nowData=eval('(' + response.data.data.weatherData + ')').now;
              var img='./../../static/images/weather/'+nowData.cond_code+'-w.png'
              console.log(img)
              _this.city=response.data.data.city
              _this.tmp=nowData.tmp
              _this.txt=nowData.cond_txt
              _this.imgUrl=img
            });
        }
        else {
          alert('failed'+this.getStatus());
        }        
      },{enableHighAccuracy: true})
    }
  },
  mounted(){
    this.getLocation()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
    width:100%;
    height: 40px;
    line-height: 40px;
    background: #41b883;
    position:relative;
    color:#fff;
  }
  .headerInfo{
    width: 1000px;
    margin: 0 auto;
  }
  .headerTitle{
    float: left;
    max-width: 400px;
    font-size: 20px;
  }
  .header img{
    width: 40px;
    vertical-align: middle;
  }
  .headerContent{
    float: right;
    text-align: right;
    max-width: 400px;
    font-size: 15px;
  }
  .headerContent span{
    margin-left: 5px;
  }
</style>
