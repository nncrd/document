<template transition="fadeOutLeft">
  <div>
    <x-header title="事件上报页面"></x-header>
    <group :title="event">
      <x-input :placeholder="eventTitleDefault" v-model:value=eventTitle required :max="50"></x-input>
    </group>
    <group :title="eventTime">
      <datetime v-model="timeData" default-selected-value="2017-06-18 13" format="YYYY-MM-DD HH" :placeholder="timeSelect" @on-change="timeChange" :title="eventStartTime" required></datetime>
    </group>
    <group :title="eventAddress">
      <x-input :placeholder="eventOccurAddressDefault" v-model:value=eventOccurAddress required :max="50"></x-input>
    </group>  
    <event-map @tranPoint='tranPoint'></event-map>
    <group :title="eventContent">  
      <x-textarea :max="250" name="description" :placeholder="mainContentDefault" v-model:value=mainContent></x-textarea>
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
      <div id="video" v-html="videoUrlHtml">
      </div>
      <div id="pictureBtn">
        <input type="file" id="fileVideo" name="file" multiple="multiple" required="required" accept="video/*" @change="addVideo"/>
        <label for="fileVideo">添加视频</label>
        <x-button mini plain type="default" @click.native='cleanVideo'>清除视频</x-button>
        <h4>{{fileValue}}</h4>
      </div>
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
import EventMap from './EventMap'
import Vue from 'vue'
//import VueResource from 'vue-resource'
import axios from 'axios'
//Vue.use(VueResource)
export default {
  directives: {
    TransferDom
  },
  components: {
    Divider, XButton ,XHeader, XTextarea, Group, XInput ,Datetime,Box, TransferDom, Previewer, Flexbox, FlexboxItem, Popup, PopupHeader, EventMap
  },
  methods: {  
    timeChange(){
      
    },
    eventSubmit(){
      var imgUrl=this.imglist[0].src;
      for(let i=1;i<this.imglist.length;i++){
        imgUrl+=','+this.imglist[i].src
      }
      let postData={
        'eventTitle':this.eventTitle,
        'timeData':this.timeData,
        'eventOccurAddress':this.eventOccurAddress,
        'eventLon':this.eventLon,
        'eventLat':this.eventLat,
        'mainContent':this.mainContent,
        'imgUrl':imgUrl,    
        'videoUrl':this.videoUrl
      }
      //this.$http.post('/vueApi.php',postData).then(function(res){console.log(res);})
      var _this=this
      axios({
        method:'post',
        url:'/emo-web/wechat/event-reporter',
        data: postData
      })
      .then(function (response) {
        console.log(response);
        if(response.data['code']==0)
        {
          console.log('上报成功')
          _this.$router.push({name:'SuccessMsg', params: { title: '事件上报成功' , icon:'', description:'',from:'/EventReporter',to:'EventReporter'}})
        }
        else if(response.data['error']==103)
        {
          console.log('用户已经被封号')
          _this.$router.push({name:'SuccessMsg', params: { title: '事件上报失败' , icon:'warn', description:'用户已经被封号',from:'/EventReporter',to:'EventReporter'}})
        }
        else if(response.data['error']==-110)
        {
          console.log('系统后台出错')
          _this.$router.push({name:'SuccessMsg', params: { title: '事件上报失败' , icon:'warn', description:'系统后台出错',from:'/EventReporter',to:'EventReporter'}})
        }
        else if(response.data['error']==-111)
        {
          console.log('没有获取微信号信息')
          _this.$router.push({name:'SuccessMsg', params: { title: '事件上报失败' , icon:'warn', description:'没有获取微信号信息',from:'/EventReporter',to:'EventReporter'}})
        }
      })
      .catch(function (error) {
        console.log(error);
      });  
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
      else if(files.length+this.videoCount > 3) {
        window.alert("每次最多只能上传3部视频");
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
        if(files[i].size>30*1024*1024)
        {
          alert("请上传小于30M的视频!");
          return;
        }
        var reader = new FileReader();        
        reader.readAsDataURL(files[i]); //将文件以Data URL形式读入页面
        var _this=this 
        reader.onload=function(e){  
          _this.videoUrlHtml+='<video controls="controls"><source src="'+this.result+'"></video>';
          _this.videoUrl+=this.result+',';
        }   
        this.videoCount++         
      }
    },
    cleanVideo(){
      this.videoUrl=''
      this.videoUrlHtml='';
      this.videoCount=0;
    },
    tranPoint(data){
      this.eventLon=data['lng'];
      this.eventLat=data['lat'];
    }
  },
  data () {
    return {
      event:'事件标题',
      eventTitleDefault:'标题',
      eventTitle:'',
      eventTime:'发生时间',
      eventStartTime:'时间',
      timeSelect:'请选择时间',
      timeData:'',
      eventAddress:'事件地点',
      eventOccurAddressDefault:'地点',
      eventOccurAddress:'',
      eventLon:'',
      eventLat:'',
      eventPic:'事件图片',
      fileValue:'',
      eventLink:'链接',
      videoPreview:'视频预览',
      videoCount:0,
      eventContent:'事件内容',
      mainContentDefault:'内容',
      mainContent:'',
      imglist: [
      {
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
      videoUrl:'',
      videoUrlHtml:'',
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
      }
    }
  }
}
</script>