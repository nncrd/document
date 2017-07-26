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
    </div>
    <div v-transfer-dom>
      <popup v-model="showMap" height="60%">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
        :left-text="leftText"
        :right-text="rightText"
        :title="mapTitle"
        :show-bottom-border="false"
        @on-click-left="showMap = false"
        @on-click-right="showMap = false">
        </popup-header>
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
          <x-button mini plain type="primary" @click.native='addPic'>添加图片</x-button>
          <x-button mini plain type="default" @click.native='cleanPic'>清除图片</x-button>
      </div>
    </group>
    <group title="请输入视频链接，多个地之以“，”隔开">      
      <x-textarea :placeholder="eventLink" name="videoAddress" v-model="linkContent" @on-enter="inputClick"></x-textarea>
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
  methods: {
    onEvent (event) {
      console.log('on', event)
    },
    inputClick(){

    },
    timeChange(){

    },
    eventSubmit(){

    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    addPic(){
      this.imglist=[{
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
      }]
    },
    cleanPic(){
      /*alert(this.imglist)
      for (var i in this.imglist) {
        delete this.imglist[i];
      }
      delete this.imglist*/
      this.imglist=[]
    },
    fetchPoint(){
      this.showMap=true
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
      eventLon:'经度',
      eventLat:'纬度',
      eventPic:'事件图片',
      eventLink:'链接',
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