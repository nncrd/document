<template>
  <div class="mainContent">
    <div id="map">
    </div>
    <div class="coverage">
      <div class="mui-input-row mui-checkbox mui-left">
        <label>
                    市县天气
          <input name="checkbox1" type="checkbox" v-model="checked">
        </label>
      </div>
    </div>
    <div class="footOption">
      <select id="footSelect">
        <option value=5000>5公里</option>
        <option value=10000>10公里</option>
        <option value=20000>20公里</option>
        <option value=50000>50公里</option>
      </select>
    </div>
    <div class="footer">
      <a href="#bottomPopover1" class="mui-btn mui-btn-link mui-pull-right">东<div id="eastInfo">加载中...</div></a>
      <a href="#bottomPopover2" class="mui-btn mui-btn-link mui-pull-right">南<div id="southInfo">加载中...</div></a>
      <a href="#bottomPopover3" class="mui-btn mui-btn-link mui-pull-right">西<div id="westInfo">加载中...</div></a>
      <a href="#bottomPopover4" class="mui-btn mui-btn-link mui-pull-right">北<div id="northInfo">加载中...</div></a>
    </div>
  </div>
</template>
<script>
import global_ from '@/components/Global'
export default {
  name: 'Main',
  data () {
    return {
      map: null,
      infoWindowFlag:false,
      polyline:null,
      winMarker:null,
      infoBoxTemp:null,
      checked:'',
      selectMarker:[],
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    checked: function () {
      var _this=this
      if(this.checked==true){
        var apiUrl=''
        if(this.map.getZoom()>10)
          apiUrl='get-allCountyWeatherNow-byAreaCode'
        else
          apiUrl='get-allWeatherNowData-byAreaCode'
        axios({
        method: 'post',
          url: global_.ajaxAddr+'/weather/'+apiUrl,
        }).then(function (res) {
            if(res){
              var weatherData=''
              var data=res.data
              if(data.data)
              {
                for(var markerNum=0;markerNum<data.data.length;markerNum++)
                {
                  weatherData=eval('(' + data.data[markerNum].weatherData + ')');
                  _this.addMarker(weatherData)
                }
              }
            }
        });
      }
      else{
        for(var i = 0; i < this.selectMarker.length; i++){
          this.map.removeOverlay(this.selectMarker[i]);
        }
      }
    }
  },
  methods:{
    bd_encrypt(gg_lon, gg_lat){  //高德坐标转百度坐标
      var X_PI = Math.PI * 3000.0 / 180.0;  
      var x = gg_lon, y = gg_lat;  
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);  
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);  
      var bd_lon = z * Math.cos(theta) + 0.0065;  
      var bd_lat = z * Math.sin(theta) + 0.006;  
      return {  
          bd_lat: bd_lat,  
          bd_lon: bd_lon  
      };  
    },
    bd_decrypt(bd_lon,bd_lat) {  //百度坐标转高德坐标
      var X_PI = Math.PI * 3000.0 / 180.0;  
      var x = bd_lon - 0.0065;  
      var y = bd_lat - 0.006;  
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);  
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);  
      var gg_lon = z * Math.cos(theta);  
      var gg_lat = z * Math.sin(theta);  
      return {  
          gg_lon: gg_lon,  
          gg_lat: gg_lat  
      }  
    },
    initMap(){
      var _this=this
      this.map = new BMap.Map("map",{minZoom:7,maxZoom:15});
      this.map.centerAndZoom(new BMap.Point(108.351032,23.814346), 8);
      var ctrl = new BMapLib.TrafficControl({
        showPanel: false //是否显示路况提示面板
      });      
      this.map.addControl(ctrl);
      ctrl.setAnchor(BMAP_ANCHOR_TOP_LEFT); 
      this.map.enableScrollWheelZoom();
      this.getBoundary()
      this.map.addEventListener("click", function(e){
        _this.queryHighway(e.point.lng,e.point.lat,_this.map.getZoom())
      });
/*        mui('#offCanvasWrapper').on('change','#footSelect',function(){
          document.querySelector('#eastInfo').innerHTML='加载中...'
          document.querySelector('#westInfo').innerHTML='加载中...'
          document.querySelector('#northInfo').innerHTML='加载中...'
          document.querySelector('#southInfo').innerHTML='加载中...'
          var selectOpt=document.getElementById('footSelect')
          getLocation(selectOpt.value)
        })*/
    },
    getBoundary(){   
      var _this=this
      var bdary = new BMap.Boundary();
      bdary.get("广西", function(rs){       //获取行政区域
        //map.clearOverlays();        //清除地图覆盖物       
        var count = rs.boundaries.length; //行政区域的点有多少个
        if (count === 0) {
          alert('未能获取当前输入行政区域');
          return ;
        }
        var pointArray = [];
        for (var i = 0; i < count; i++) {
          var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#0f7347",fillColor:"transparent"}); //建立多边形覆盖物
          _this.map.addOverlay(ply);  //添加覆盖物
          pointArray = pointArray.concat(ply.getPath());
        } 
        var circle = rs.boundaries + ";170.672126, -68.045308 ;114.15563, -68.045308;-169.604276, -68.045308;-169.604276, 38.244136;-169.604276,  81.291804;105.913641, 81.291804;170.672126, 81.291804;170.672126, 39.623555;170.672126, -68.045308 ;"
        var polygon2 = new BMap.Polygon(circle, {
          strokeColor: "transparent",
          strokeWeight: 2,
          fillColor:"grey",
          fillOpacity:0.5
        });
        _this.map.addOverlay(polygon2);
      });
    },
    queryHighway(lon,lat,level){
      var _this=this
      var values=this.bd_decrypt(lon,lat)
      var a = values.gg_lon;
      var b = values.gg_lat;
      axios({
        method: 'post',
        url: global_.ajaxAddr+'/weather/getRoadData?x='+a+'&y='+b+'&level='+level,
      }).then(function (data) {   
          if(data.data.geojson && !_this.infoWindowFlag){
          var geojson=eval('(' + data.data.geojson + ')');
          _this.showMessageWin(data.data.showpoint,data.data.adname,data.data.cname,level)
          _this.drawHighway(geojson.coordinates[0])
        }
      });
    },
    drawHighway(highwayArray){
      var lineArray=[]
      var lineOption={strokeColor:"#ff0000", strokeWeight:8, strokeOpacity:0.6}
      for(var j=1;j<highwayArray.length;j++)
      {
        var values= this.bd_encrypt(highwayArray[j][0], highwayArray[j][1])
        var a = values.bd_lon;
        var b = values.bd_lat;
        lineArray.push(new BMap.Point(a, b))
      }
      this.map.removeOverlay(this.polyline)
      this.polyline = new BMap.Polyline(lineArray, lineOption);   
      this.map.addOverlay(this.polyline);
    },
    showMessageWin(showpoint,adname,cname,level){
      var _this=this
      var values=this.bd_decrypt(showpoint.split(" ")[0],showpoint.split(" ")[1])
      var a = values.gg_lon;
      var b = values.gg_lat;
      axios({
        method: 'post',
        url: global_.ajaxAddr+'/weather/highway/getByXY?x='+a+'&y='+b+'&level=11',
      }).then(function (data) {
          if(data.data)
          {
            var data=data.data
            var point = new BMap.Point(a,b)
            _this.map.removeOverlay(_this.winMarker)
            var myIcon = new BMap.Icon("./../../static/images/pix.png", new BMap.Size(1,1));
            _this.winMarker = new BMap.Marker(point,{icon:myIcon});
            _this.map.addOverlay(_this.winMarker);
            setTimeout(function(){_this.map.panTo(point)},100)
            var img=''
            var weatherData=eval('(' + data.data.weatherNowData + ')').weatherData
            var HourData=eval('(' + data.data.forcast24HourData + ')').weatherData
            var HourDataJson=eval('(' + HourData + ')').hourly
            
            var cond_code=eval('(' + weatherData + ')').now.cond_code
            var nowData=eval('(' + weatherData + ')').now
            var basicData=eval('(' + weatherData + ')').basic
            if(cond_code=="100") {img='./../../static/images/weather/00.png'}
            else if(cond_code=="101") {img='./../../static/images/weather/01.png'}
            else if(cond_code=="102") {img='./../../static/images/weather/01.png'}
            else if(cond_code=="103") {img='./../../static/images/weather/01.png'}
            else if(cond_code=="104") {img='./../../static/images/weather/02.png'}
            else if(cond_code=="305") {img='./../../static/images/weather/07.png'}

            var sContent =
              '<div id="boxContent">' +
                '<div class="infoTitle">'+cname+adname.split(":")[2]+'段</div>'+
                '<div id="infoBoxBody">'+
                  '<div class="infoBoxTab">'+
                    '<label class="active actualTime">实时信息</label>'+
                    '<label class="forecast">24小时预测</label>'+                      
                  '</div>'+
                  '<div class="infoBoxInfo">'+
                    '<div class="infoBoxText">'+
                      "<div id='infoContent'>" +
                        "<table>"+
                          "<tr><td>体感温度：</td><td><span>"+nowData.fl+"°C</span></td><td>云量：</td><td><span>"+nowData.cloud+"</span></td></tr>"+
                          "<tr><td>降雨量：</td><td><span>"+nowData.pcpn+"</span></td><td>风向：</td><td><span>"+nowData.wind_dir+"</span></td></tr>"+
                          "<tr><td>能见度：</td><td><span>"+nowData.vis+"公里</span></td><td>风速：</td><td><span>"+nowData.wind_spd+"公里/时</span></td></tr>"+
                          "<tr><td>大气压强：</td><td><span>"+nowData.pres+"</span></td><td>风力：</td><td><span>"+nowData.wind_sc+"级</span></td></tr>"+
                          "<tr><td>相对湿度：</td><td><span>"+nowData.hum+"</span></td></tr>"+
                        "</table>"+
                      "</div>"+
                    "</div>"+
                    "<div class='infoBoxImg'>"+
                      "<img id='imgDemo' src='"+img+"' title='"+basicData.location+"'/>"+
                      "<div id='condText'>"+ nowData.cond_txt +"</div>"+
                      "<div>"+ nowData.tmp +"°C</span></div>"+
                    "</div>"+
                  "</div>"+
                  '<div class="infoBoxInfo2">'+
                    '<div id="infoBoxContent"></div>'+
                    '<div id="infoBoxSta"></div>'+
                  "</div>"+
                "</div>"+
              '</div>'+
              "<div id='infoBoxFooter'><img src='https://qiniu.jyblue.com/infobox/arrow_down3.png?imageslim'></div>"
            var infoWindow = new BMap.InfoWindow(sContent); 
            var opts = {
              boxStyle:{
                  //background:'#f4f4f4',
                  width:'25rem',
                  fontSize:'0.9rem',
                  //border:'solid 1px #dcdcdc',
                  borderRadius:'0.5rem'
              },
              closeIconUrl:'./../../static/images/close.png',
              closeIconMargin:'0.2rem',
              offset: new BMap.Size(0, 0),
              enableAutoPan : true     //自动平移
            };
            var infoBox = new BMapLib.InfoBox(_this.map, sContent, opts);
            if(_this.infoBoxTemp){
              _this.infoBoxTemp.close();
              var obox = document.querySelector('.infoBox');
              if(obox){
                  obox.parentNode.removeChild(obox);
              }
              else{
              }
            }
            _this.infoBoxTemp = infoBox;
            var timeArr=[]
            var tmpArr=[]
            var popArr=[]
            var weather=[]
            for(var i=0;i<HourDataJson.length;i++){                
              timeArr.push(HourDataJson[i].time.split(" ")[1])
              tmpArr.push(HourDataJson[i].tmp)
              popArr.push(HourDataJson[i].pop)
              weather.push(HourDataJson[i].cond_code)
            }

            setTimeout(function () 
            {
              _this.infoBoxTemp.open(point);
              var thisimg = document.getElementById('map').getElementsByClassName('infoBox')[0].getElementsByTagName('img');
              for(var i=0;i<thisimg.length;i++){
                if(thisimg[i].src.indexOf('close')>-1){
                  thisimg[i].addEventListener('click',function (e) {
                    _this.infoBoxTemp.close();
                    e.stopPropagation();
                    _this.map.removeOverlay(_this.polyline) 
                  });
                  thisimg[i].addEventListener('touchend',function (e) {
                    _this.infoBoxTemp.close();
                    e.stopPropagation();
                    _this.map.removeOverlay(_this.polyline)
                  })
                }
              }
              var thisLabel1 = document.getElementById('map').getElementsByClassName('infoBox')[0].getElementsByClassName('actualTime')[0];
              var thisLabel2 = document.getElementById('map').getElementsByClassName('infoBox')[0].getElementsByClassName('forecast')[0];
              var info1 = document.getElementById('map').getElementsByClassName('infoBox')[0].getElementsByClassName('infoBoxInfo')[0];
              var info2 = document.getElementById('map').getElementsByClassName('infoBox')[0].getElementsByClassName('infoBoxInfo2')[0];
              
              thisLabel1.addEventListener('click',function (e) {
                this.classList.add("active")
                thisLabel2.classList.remove("active")
                e.stopPropagation();
                info1.style.display="-webkit-box"
                info2.style.display="none"
              })
              thisLabel2.addEventListener('click',function (e) {
                this.classList.add("active")
                thisLabel1.classList.remove("active")
                e.stopPropagation();
                info1.style.display="none"
                info2.style.display="block"
              })
              _this.initCanvas(timeArr,tmpArr,popArr,weather)
            },50);
          }
      })
    },
    addMarker(weatherData){
      var _this=this
      var icon = new BMap.Icon('./../../static/images/weather/'+weatherData.now.cond_code+'-s.png', new BMap.Size(35,35));
      var img='./../../static/images/weather/'+weatherData.now.cond_code+'.png'
      var point = new BMap.Point(weatherData.basic.lon,weatherData.basic.lat);
      var marker = new BMap.Marker(point,{icon:icon});
      _this.selectMarker.push(marker)
      var sContent =
        "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+weatherData.basic.location+"</h4>" + 
        "<img style='float:right;margin:4px:clear:both' id='imgDemo' src='"+img+"' width='100' height='100' title=''/>" + 
        "<div style='float: right;margin-right: 17px;clear: both;text-align: center;'>"+weatherData.now.cond_txt+"<br><span style='font-size:1.8rem;color: #277ad4;;'>"+weatherData.now.tmp+"°C</span></div>"+
        "<div id='infoContent' style='margin:0;line-height:1.5;font-size:13px;width:280px'>" +
          "<table style='margin-left:20px'>"+
            "<tr><td>体感温度：</td><td><span>"+weatherData.now.fl+"°C</span></td></tr>"+
            "<tr><td>风向：</td><td><span>"+weatherData.now.wind_dir+"</span></td></tr>"+
            "<tr><td>风力：</td><td><span>"+weatherData.now.wind_sc+"级</span></td></tr>"+
            "<tr><td>风速：</td><td><span>"+weatherData.now.wind_spd+"公里/时</span></td></tr>"+
            "<tr><td>相对湿度：</td><td><span>"+weatherData.now.hum+"</span></td></tr>"+
            "<tr><td>降雨量：</td><td><span>"+weatherData.now.pcpn+"</span></td></tr>"+
            "<tr><td>大气压强：</td><td><span>"+weatherData.now.pres+"</span></td></tr>"+
            "<tr><td>能见度：</td><td><span>"+weatherData.now.vis+"公里</span></td></tr>"+
            "<tr><td>云量：</td><td><span>"+weatherData.now.cloud+"</span></td></tr>" + 
          "</table>"+
        "</div>"
      var infoWindow = new BMap.InfoWindow(sContent);
      infoWindow.addEventListener("close",function(){//点击信息窗口的关闭按钮时触发此事件
        _this.infoWindowFlag=false
      })
      marker.addEventListener("click", function(){          
        this.openInfoWindow(infoWindow);
        _this.infoWindowFlag=true;
        document.getElementById('imgDemo').onload = function (){
          infoWindow.redraw();
        }
      });
      _this.map.addOverlay(marker);
      var label = new BMap.Label(weatherData.now.tmp+"°C");
      label.setStyle({
        background:'rgba(0,0,0,0)',
        border:'none',
        color:'#af3b65',
        fontSize:"18px",
        fontWeight:"bold"
      });
      label.setOffset(new BMap.Size(0,30))
      marker.setLabel(label);
    },
    initCanvas(timeArr,tmpArr,popArr,weather){
        var dom = document.getElementById("infoBoxContent");
        var myChart = echarts.init(dom);
        var app = {};
        var option = null;
        var colors = [ '#f16661','#6bb6f1', '#675bba'];
        option = {
          color: colors,
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data:['温度(°C)','降水概率(%)']
          },
          grid: {
            top: 30,
            bottom: 20
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
              },
              data: timeArr,
            }
          ],
          yAxis: [
            {       
              //show:false,
              type: 'value',
              splitNumber:2,
              axisLine: {
                lineStyle: {
                  color: colors[0],
                }
              },
            },
            {
              type: 'value',
              splitNumber:2,
              position: 'right',
              axisLine: {
                  lineStyle: {
                      color: colors[1]
                  }
              },
              axisLabel: {
                  formatter: '{value}',
                  fontSize:'12',
              }
            },
          ],
          series: [
            {
              name:'温度(°C)',
              type:'line',
              smooth: true,
              data: tmpArr,
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops:[{
                    offset: 0, color: 'rgba(241,102,97,0.5)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(241,102,97,0)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            {
              name:'降水概率(%)',
              type:'bar',
              barMaxWidth:12,//最大宽度
              yAxisIndex: 1,
              data:popArr,
              itemStyle: {
                normal: {
                  barBorderRadius: 3,
                }
              }
            }
          ]
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
        var str=''
        for(var i=0; i<8 ;i+=1){
          str += "<div><img src='./../../static/images/weather/"+weather[i]+"-s.png' /></div>";
        }
        var temPredictionSta = document.getElementById("infoBoxSta")
        temPredictionSta.innerHTML=str
      }
  },
  mounted(){
    this.initMap()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mainContent{
    width:1000px;
    height: 600px;
    margin: 0 auto;
    background: #fafafa;
    position: relative;
  }
  #map{
    width:100%;
    height: 100%;
  }
  .coverage{
    position: absolute;
    top: .7rem;
    right: 1rem;
    height: 24px;
    width: 5rem;
    z-index: 10000;
    color: #666;
    background: rgba(255,255,255,1);
    border: solid 1px #aaa;
    font-size: .7rem;
    line-height: 24px;  
    border-radius:4px;
  }
  .coverage input{
    vertical-align: middle;
  }
  .footOption{
  position:absolute;
  bottom:4rem;
  left:.2rem;
  height: 1rem;
  z-index: 10000;
  color:#999;
}
.footOption select{
  box-shadow: 0 0 2px rgba(96,96,96,0.5);
}
.footOption select{
  background: rgba(255,255,255,0.7);
}
.footer{
  position:absolute;
  bottom:0;
  left:0;
  height: 3.5rem;
  width:400px;
  z-index: 10000;
  display: flex;
}
.footer > a{
  flex: 1;
  color:#999;
  border-radius: .2rem;
  text-align: center;
  padding:.3rem .1rem;
  margin:.2rem;
  background: rgba(255,255,255,0.7);
  box-shadow: 0 0 2px rgba(96,96,96,0.5);
}
.footer > a div{
  color:#3daafc;
}
</style>
