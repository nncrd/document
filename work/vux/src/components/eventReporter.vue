<template>
  <div>
    <x-header title="事件上报页面"></x-header>
    <group :title="event">
      <x-input :placeholder="eventTitle"></x-input>
    </group>
    <group :title="eventTime">
      <datetime v-model="timeData" default-selected-value="2017-06-18 13" format="YYYY-MM-DD HH" :placeholder="timeSelect" @on-change="timeChange" :title="eventStartTime"></datetime>
    </group>
    <group :title="eventAddress">
      <x-input :placeholder="eventOccurAddress"></x-input>
    </group>  
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
    <group :title="eventContent">  
      <x-textarea :max="250" name="description" :placeholder="mainContent"></x-textarea>
    </group>
    <group :title="eventPic">
      <img class="previewer-demo-img" v-for="(item, index) in imglist" :src="item.src" width="100" @click="show(index)">
      <div v-transfer-dom>
        <previewer :list="imglist" ref="previewer" :options="options"></previewer>
      </div>
      <div id="pictureBtn">
        <input type="file" id="fileImg" name="file" multiple="multiple" required="required" accept="image/*" @change="addPic"/>
        <label for="fileImg">添加图片</label>
        <x-button mini plain type="default" @click.native='cleanPic'>清除图片</x-button>
        <h4>{{fileValue}}</h4>
      </div>
    </group>
    <group :title="videoPreview">
      <video id="video" controls="controls" >
        <source :src="videoList">
      </video>
      <div id="pictureBtn">
        <input type="file" id="fileVideo" name="file" multiple="multiple" required="required" accept="video/*" @change="addVideo"/>
        <label for="fileVideo">添加视频</label>
        <x-button mini plain type="default" @click.native='cleanVideo'>清除视频</x-button>
        <h4>{{fileValue}}</h4>
      </div>
    </group>
    <group title="请输入视频链接，多个地址以“，”隔开">      
      <x-textarea :placeholder="eventLink" name="videoAddress" v-model="linkContent"></x-textarea>
    </group>
    <box gap="1em 1em">  
      <x-button @click.native="eventSubmit" type="primary">提交</x-button>
    </box>
  </div>
</template>
<style scoped>
@import '../assets/css/eventReporter.css'
</style>
<script>
import {Divider, XButton ,XHeader, XTextarea, Group, XInput ,Datetime,Box, TransferDom, Previewer, Flexbox, FlexboxItem, Popup, PopupHeader} from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Divider, XButton ,XHeader, XTextarea, Group, XInput ,Datetime,Box, TransferDom, Previewer, Flexbox, FlexboxItem, Popup, PopupHeader
  },
  mounted(){
    this.initMap();
  },
  methods: {  
    timeChange(){
      alert(this.timeData)
    },
    eventSubmit(){

    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    addPic(e){
      const files = e.target.files
      if(!files.length) {
        return;
      } 
      else if(files.length + this.imglist.length > 6) {
        window.alert("每次最多只能上传6张图片");
        return;
      } 
      if(typeof FileReader == 'undefined'){
        this.fileValue="你的浏览器不支持FileReader接口！功能无法正常使用！"
      }
      for(var i=0;i<files.length;i++){
        if(!/image\/\w+/.test(files[i].type)){
          alert("请选择图片！");
          return;
        }   
        var reader = new FileReader();        
        reader.readAsDataURL(files[i]); //将文件以Data URL形式读入页面
        var _this=this 
        reader.onload=function(e){  
          var arr={'src':this.result};
          _this.imglist.push(arr);
        }            
      }
    },
    cleanPic(){
      this.imglist=[]
    },
    addVideo(e){
      const files = e.target.files
      if(!files.length) {
        return;
      } 
      else if(files.length + this.videoList.length > 2) {
        window.alert("每次最多只能上传2部视频");
        return;
      } 
      if(typeof FileReader == 'undefined'){
        this.fileValue="你的浏览器不支持FileReader接口！功能无法正常使用！"
      }
      for(var i=0;i<files.length;i++){
        if(!/video\/\w+/.test(files[i].type)){
          alert("请选择视频！");
          return;
        }   
        var reader = new FileReader();        
        reader.readAsDataURL(files[i]); //将文件以Data URL形式读入页面
        var _this=this 
        reader.onload=function(e){  
          var arr={'src':this.result};
          //_this.videoList.push(arr);
          console.log(this.result)
          _this.videoList=this.result
        }            
      }
    },
    cleanVideo(){
      this.videoList=[]
    },
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
        map.addOverlay(marker);            //显示点     
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
  },
  data () {
    return {
      event:'事件标题',
      eventTitle:'标题',
      eventTime:'发生时间',
      eventStartTime:'时间',
      timeSelect:'请选择时间',
      timeData:'',
      eventAddress:'事件地点',
      eventOccurAddress:'地点',
      eventLon:'',
      eventLat:'',
      eventPic:'事件图片',
      fileValue:'',
      eventLink:'链接',
      videoPreview:'视频预览',
      linkContent:'',
      eventContent:'事件内容',
      mainContent:'内容',
      linkData:'',
      imglist: [{
        src: 'https://ooo.0o0.ooo/2017/05/17/591c271ab71b1.jpg',
        w: 800,
        h: 400
      },
      {
        src: 'https://ooo.0o0.ooo/2017/05/17/591c271acea7c.jpg',
      }, 
      {
        src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg',
      }, 
      {
        src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg',
      }, 
      {
        src: 'https://ooo.0o0.ooo/2017/05/17/591c271ab71b1.jpg',
      }, 
      {
        src: 'https://ooo.0o0.ooo/2017/05/17/591c271acea7c.jpg',
      }],
      videoList:'',
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      },
      showMap:false,
      leftText:'取消',
      rightText:'确定',
      mapTitle:'请选取地址'
    }
  }
}
</script>