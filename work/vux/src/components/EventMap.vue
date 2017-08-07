<template>
  <div>
    <div id="mapFetch">
      <label>
        <icon name='map-marker'scale='1.5'></icon>
        <x-button mini plain type="primary" @click.native='fetchPoint'>地图取点</x-button>
      </label>
      <p v-show='eventLon'>选中点坐标：（{{eventLon}}，{{eventLat}}）</p>
    </div>
    <div v-transfer-dom>
      <popup v-model="showMap" height="100%">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
        :left-text="leftText"
        :right-text="rightText"
        :title="mapTitle"
        :show-bottom-border="false"
        @on-click-left="showMap = false"
        @on-click-right="showMap = false">
        </popup-header>
        <div id="mainMap"></div>
      </popup>
    </div>
  </div>
</template>
<script type="text/javascript">
import {XButton, TransferDom ,Popup, PopupHeader} from 'vux'
  export default{
    directives: {
      TransferDom
    },
    components:{
      XButton ,Popup, PopupHeader
    },
    mounted(){
      this.initMap();
      console.log(this.mapTitle)
      console.log(this.$parent.event)
    },
    data(){
      return{
        eventLon:'',
        eventLat:'',
        showMap:false,
        leftText:'取消',
        rightText:'确定',
        mapTitle:'请选取地址'
      }
    },
    methods:{
      fetchPoint(){
        this.showMap=true;
      },    
      initMap(){
        var map = new BMap.Map("mainMap",{minZoom:7,maxZoom:18});    // 创建Map实例,设置地图允许的最小/大级别
        var point = new BMap.Point(105.553232,26.590884) //设置中心点坐标
        map.centerAndZoom(point, 7);  // 初始化地图,设置地图级别
        //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.setCurrentCity("南宁");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放      
        var marker = new BMap.Marker(new BMap.Point(105.803232,26.190884))// 创建点
        var _this=this
        map.addEventListener("click",function(e){//监听点击地图事件
          _this.eventLon=e.point.lng;
          _this.eventLat=e.point.lat;
          marker.point={'lng':e.point.lng,'lat':e.point.lat}
          map.addOverlay(marker);        //显示点
          _this.$emit('tranPoint',marker.point)
        });
        this.getBoundary(map)
      },
      getBoundary(map){       
        var bdary = new BMap.Boundary();
        bdary.get("广西", function(rs){       //获取行政区域
          map.clearOverlays();        //清除地图覆盖物       
          var count = rs.boundaries.length; //行政区域的点有多少个
          if (count === 0) {
            alert('未能获取当前输入行政区域');
            return ;
          }
          var pointArray = [];
          for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000",fillColor:"rgba(255,255,255,0.4)"}); //建立多边形覆盖物
            map.addOverlay(ply);  //添加覆盖物
            pointArray = pointArray.concat(ply.getPath());
          }    
          //map.setViewport(pointArray);    //调整视野   
          //map.panTo(new BMap.Point(105.203232,27.190884));
        });       
      }
    }
  }
</script>