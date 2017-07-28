<style>
    .middle-block{flex: 1;padding: 0.5rem;}
    .middle-box{height: 100%;box-shadow: 0 0 0.3rem rgba(0,0,0,0.8);position: relative;}
    #map{width: 100%;height: 100%;}
    .middle-box{}
    .right-title{background: #58B7FF;color: white;line-height: 2rem;padding-left: 1rem;}
    .fbqh{text-align: center;}
    .fbqh img{height: 80%;margin-top: 5%;}
</style>

<template>
    <div class="middle-block">
        <div class="map-box middle-box" v-show="now_path==='skjc'||now_path==='zhyb'||now_path==='ylcx'||now_path==='ylfb'">
            <div id="map"></div>
            <v-tuceng></v-tuceng>
        </div>
        <v-ylbg v-if="now_path==='ylbg'"></v-ylbg>
        <div class="fbqh middle-box" v-if="now_path==='zhqy'||now_path==='rkfb'" >
            <img src="http://ogbcvxavq.bkt.clouddn.com/pwebdisasterArea.png?imageslim" v-show="now_path==='zhqy'">
            <img src="http://ogbcvxavq.bkt.clouddn.com/pwebpopulation.png?imageslim" v-show="now_path==='rkfb'">
        </div>
        <div class="ssjc middle-box" v-if="now_path==='wxyt'||now_path==='ldt'||now_path==='tflj'" style="text-align: center;">
            <iframe src="http://58.59.134.179/guangxi/skyuntupic.asp" width="80%" height="100%" frameborder="0" scrolling="no" style="max-width: 1060px;" v-if="now_path==='wxyt'">
                您的浏览器无法显示该网页，请升级到最新版本或者使用谷歌、360浏览器访问。
            </iframe>
            <iframe src="http://58.59.134.179/guangxi/skswan.asp?ds=bh" width="75%" height="100%" frameborder="0" scrolling="no" style="max-width: 1060px;" v-if="now_path==='ldt'">
                您的浏览器无法显示该网页，请升级到最新版本或者使用谷歌、360浏览器访问。
            </iframe>
            <iframe src="http://58.59.134.179/guangxi/typhoon/tyonline.html" width="100%" height="100%" frameborder="0" scrolling="no"  v-if="now_path==='tflj'">
                您的浏览器无法显示该网页，请升级到最新版本或者使用谷歌、360浏览器访问。
            </iframe>
        </div>
        <v-sjsb v-if="now_path==='sjsb'"></v-sjsb>
        <v-kpzs v-if="now_path==='qxkp'||now_path==='dzzh'"></v-kpzs>

    </div>
</template>

<script>
    import Tuceng from '@/components/middle/Tuceng'
    import Ylbg from '@/components/middle/Ylbg'
    import Sjsb from '@/components/middle/Sjsb'
    import Kpzs from '@/components/middle/Kpzs'
    //var urlHead = 'http://222.216.111.50:9380/pb-web/';
    //var urlHead ='http://localhost:8080/pb-web/'
    var urlHead = '../../';
    export default {
        name: '',
        data () {
            return {}
        },
        components:{
            'v-tuceng':Tuceng,'v-ylbg':Ylbg,'v-sjsb':Sjsb,'v-kpzs':Kpzs
        },
        computed:{
            isoline_hour () {
                return this.$store.state.isoline_hour
            },
            now_path(){
                return this.$store.state.now_path
            },
            tuceng(){
                return this.$store.state.tuceng
            }
        },
        methods:{
            initMap(){
                var _this = this;
                //             百度地图API功能
                var map = new BMap.Map("map",{enableMapClick: false,minZoom:10});    // 创建Map实例
                if(document.body.offsetWidth<1280){
                    map.centerAndZoom("浦北",10);   // 初始化地图,设置中心点坐标和地图级别
                }else{
                    map.centerAndZoom("浦北",11);   // 初始化地图,设置中心点坐标和地图级别
                }
                map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP,BMAP_HYBRID_MAP ],offset: new BMap.Size(10, 10)}));//添加地图类型控件
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                var bottom_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT,offset: new BMap.Size(10, 10)});// 左上角，添加比例尺
                map.addControl(bottom_left_control);
                var infoBoxTemp = null;

                var ditu = {
                    // 描绘获取浦北界限
                    getBoundry:function() {
                        _this.$http({
                            method:'GET',
                            url:'static/js/pubei_colon.txt'
                        }).then(function(data){
                            var content = data.body;
                            var contentPlus = content + content.split(";")[0];

                            var polygon1 = new BMap.Polygon(contentPlus, {
                                strokeColor: "darkred",
                                strokeWeight: 3,
                                fillColor: "transparent",
                                fillOpacity:0.3
                            });  //创建多边形边界
//                            polygon1.disableMassClear(); //这里设置了不可清除!!!!!!
                            map.addOverlay(polygon1);          //增加折线

                            var circle = content + "170.672126, -68.045308 ;114.15563, -68.045308;-169.604276, -68.045308;-169.604276, 38.244136;-169.604276,  81.291804;105.913641, 81.291804;170.672126, 81.291804;170.672126, 39.623555;170.672126, -68.045308 ;"

                            var polygon2 = new BMap.Polygon(circle, {
                                strokeColor: "transparent",
                                strokeWeight: 3,
                                fillColor:"grey",
                                fillOpacity:0.3
                            });  //创建多边形
//                            polygon2.disableMassClear();//这里设置了不可清除!!!!!!
                            map.addOverlay(polygon2);          //增加折线
                        },function (err) {
                            console.log('没有获得本地数据！')
                            console.log(err)
                        })
                    },
                    getBoundry1:function () {
                        var bdary = new BMap.Boundary();
                        bdary.get("浦北县", function(rs){       //获取行政区域
                            var count = rs.boundaries.length; //行政区域的点有多少个
                            if (count === 0) {
                                alert('未能获取当前输入行政区域');
                                return ;
                            }
                            for (var i = 0; i < count; i++) {
                                var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 3, strokeColor: "darkred",fillColor:'transparent'}); //建立多边形覆盖物
                                map.addOverlay(ply);  //添加覆盖物
                            }
                            var circle = rs.boundaries + ";170.672126, -68.045308 ;114.15563, -68.045308;-169.604276, -68.045308;-169.604276, 38.244136;-169.604276,  81.291804;105.913641, 81.291804;170.672126, 81.291804;170.672126, 39.623555;170.672126, -68.045308 ;"
                            var polygon2 = new BMap.Polygon(circle, {
                                strokeColor: "transparent",
                                strokeWeight: 3,
                                fillColor:"grey",
                                fillOpacity:0.3
                            });
                            map.addOverlay(polygon2);
                        });
                    },
                    // 添加标注点
                    addMarker:function(point,icon,labelContent,infoContent,title,ptype) {
                        var marker = new BMap.Marker(point,{icon:icon});  // 创建标注
                        map.addOverlay(marker);              // 将标注添加到地图中

                        var label = new BMap.Label(labelContent);
                        label.setStyle({
                            background:'rgba(0,0,0,0)',
                            border:'none',
                            color:'purple',
                            fontWeight:'bold',
                            offset:new BMap.Size(100,-1000)
                        });
                        if(ptype.indexOf('yhd')>-1){
                            label.setStyle({
                                display:'none'
                            });
                        }

                        label.setOffset(new BMap.Size(18,5))
                        marker.setLabel(label);


                        infoContent = '<div class="infoTitle">'+title+'</div><div id="infoBoxBody">'+infoContent+'</div><div id="infoBoxFooter"><img src="http://ogbcvxavq.bkt.clouddn.com/infobox/arrow_down.png?imageslim"></div>';

                        var opts = {
                            boxStyle:{
                                // background:'#f4f4f4',
                                width:'20rem',
                                // border:'solid 1px #dcdcdc',
                                borderRadius:'0.5rem'
                            },
                            closeIconUrl:'http://ogbcvxavq.bkt.clouddn.com/infobox/close.png?imageslim',
                            closeIconMargin:'0.2rem',
                            // enableAutoPan : true     //自动平移
                        };
                        var infoBox = new BMapLib.InfoBox(map, infoContent, opts);

                        marker.addEventListener('click',function () {

                            if(infoBoxTemp){
                                infoBoxTemp.close();
                                $('.infoBox').remove();
                            }
                            infoBoxTemp = infoBox;

                            setTimeout(function () {
                                infoBoxTemp.open(point);
                            },50);

                            setTimeout(function () {
                                map.panTo(point);
                            },200);





                            $('#map').on('click touchend','.infoBox img',function () {
                                if($(this).attr('src').indexOf('close')>-1){
                                    infoBoxTemp.close();
                                }
                            });




                        });

                    },
                    // 解析数据并调用addMarker方法，实现数据展示
                    addPoints:function (figures,ptype){
                        console.log(ptype)
                        var json = figures;
                        for(var i=0;i<json.length;i++){
                            var point = new BMap.Point(json[i].lon,json[i].lat);
                            var icon = new BMap.Icon("http://ogbcvxavq.bkt.clouddn.com/pwebraindrop.png?imageslim", new BMap.Size(20,20));
                            var infoContent = '';
                            var title = '';
                            var labelContent = i;
                            // 如果是雨量站
                            if(ptype.indexOf('ylz')>-1){
                                var precipitation = json[i].precipitation==null||json[i].precipitation==''?'-':json[i].precipitation;
                                var alertdegree = json[i].alertdegree==null ? '0' : json[i].alertdegree;
                                var statoionType = json[i].statoionType==null ? '无' : json[i].statoionType;
                                // 根据预警级别确定icon颜色----------------------------
                                if(alertdegree==0||alertdegree=='0'){
                                    alertdegree='无预警';
                                }
                                else if(alertdegree==1||alertdegree=='1'){
                                    alertdegree='蓝色预警';
                                }
                                else if(alertdegree==2||alertdegree=='2'){
                                    alertdegree='黄色预警';
                                }
                                else if(alertdegree==3||alertdegree=='3'){
                                    alertdegree='橙色预警';
                                }
                                else if(alertdegree==4||alertdegree=='4'){
                                    alertdegree='红色预警';
                                }

                                var rainName = '雨&nbsp;&nbsp;量';
                                if(ptype.indexOf('sum')>-1){rainName = '累计雨量'}
                                labelContent = precipitation;
                                title = json[i].stationName;
                                icon = new BMap.Icon('http://ogbcvxavq.bkt.clouddn.com/pwebraindrop.png?imageslim', new BMap.Size(30,30));
                                infoContent=
                                        '<div class="infoBoxInfo">'+
                                        '<div class="infoBoxText">'+

                                        '<div class="infoBoxText_min">'+
                                        '<div class="infoName">站&nbsp;&nbsp;号：</div>'+
                                        '<div class="infoValue">'+json[i].stationNum+'</div>'+
                                        '</div>'+

                                        '<div class="infoBoxText_min">'+
                                        '<div class="infoName">站 类 型：</div>'+
                                        '<div class="infoValue">'+statoionType+'</div>'+
                                        '</div>'+

                                        '<div class="infoBoxText_min">'+
                                        '<div class="infoName">'+rainName+'：</div>'+
                                        '<div class="infoValue">'+precipitation+'</div>'+
                                        '</div>'+

                                        '<div class="infoBoxText_min">'+
                                        '<div class="infoName">预警级别：</div>'+
                                        '<div class="infoValue">'+alertdegree+'</div>'+
                                        '</div>'+
                                        '</div>'+
                                        '<div class="infoBoxImg"><img src="http://ogbcvxavq.bkt.clouddn.com/pwebmonitoringStationPhoto.png?imageView2/1/w/80/h/80/imageslim" alt="加载中..."></div>'+
                                        '</div>'

                            }
                            // 如果是隐患点
                            else if(ptype.indexOf('yhd')>-1){
                                // if(json[i].landImg!=null){
                                //     console.log(json[i].dname+'/'+json[i].landImg)
                                // }
                                var typeCode = null;
                                var alertDegree = json[i].alertDegree==null ? 0 : json[i].alertDegree;
                                var validRain = json[i].validRain==null||json[i].validRain==''?'-':json[i].validRain;
                                var deg_color = 'green';


                                // 当是预报的时候
                                //预报有效雨量
                                var predictvalidRain = json[i].predictValidRain == null ? "-" : json[i].predictValidRain;//一小时
                                var predictvalidRain12 = json[i].predictValidRain12 == null ? "-" : json[i].predictValidRain12;//十二小时
                                var predictvalidRain24 = json[i].predictValidRain24 == null ? "-" : json[i].predictValidRain24;//二十四小时
                                //预报预警级别
                                var predictLevel = json[i].predictLevel == null||json[i].predictLevel =="0" ? "无" : json[i].predictLevel;//一小时
                                var predictLevel12 = json[i].predictLevel12 == null||json[i].predictLevel12 =="0" ? "无" : json[i].predictLevel12;//十二小时
                                var predictLevel24 = json[i].predictLevel24 == null||json[i].predictLevel24 =="0" ? "无" : json[i].predictLevel24;//二十四小时
                                // 根据传入的时间（ptype）确定选用哪个时间段的预测
                                if(ptype=='fyhd1'){
                                    alertDegree = predictLevel;
                                    validRain = predictvalidRain;
                                }
                                else if(ptype=='fyhd12'){
                                    alertDegree = predictLevel12;
                                    validRain = predictvalidRain12;
                                }
                                else if(ptype=='fyhd24'){
                                    alertDegree = predictLevel24;
                                    validRain = predictvalidRain24;
                                }

                                // 根据预警级别确定icon颜色----------------------------
                                if(alertDegree==0||alertDegree=='0'){
                                    alertDegree='无预警';
                                    deg_color = 'green';
                                }
                                else if(alertDegree==1||alertDegree=='1'){
                                    alertDegree='蓝色预警';
                                    deg_color = 'blue';
                                }
                                else if(alertDegree==2||alertDegree=='2'){
                                    alertDegree='黄色预警';
                                    deg_color = 'yellow';
                                }
                                else if(alertDegree==3||alertDegree=='3'){
                                    alertDegree='橙色预警';
                                    deg_color = 'orange';
                                }
                                else if(alertDegree==4||alertDegree=='4'){
                                    alertDegree='红色预警';
                                    deg_color = 'red';
                                }
                                // 根据隐患级别确定icon路径--------------------------
                                if(json[i].typeCode==0||json[i].typeCode=='0'){
                                    typeCode = '无';
                                    icon = new BMap.Icon('http://ogbcvxavq.bkt.clouddn.com/pweb'+deg_color+'Point3.png', new BMap.Size(15,15));
                                }
                                else if(json[i].typeCode==1||json[i].typeCode=='1'){
                                    typeCode = '小型';
                                    icon = new BMap.Icon('http://ogbcvxavq.bkt.clouddn.com/pweb'+deg_color+'Point3.png', new BMap.Size(15,15));
                                }
                                else if(json[i].typeCode==2||json[i].typeCode=='2'){
                                    typeCode = '中型';
                                    icon = new BMap.Icon('http://ogbcvxavq.bkt.clouddn.com/pweb'+deg_color+'Point2.png', new BMap.Size(20,20));
                                }
                                else if(json[i].typeCode==3||json[i].typeCode=='3'){
                                    typeCode = '重大级';
                                    icon = new BMap.Icon('http://ogbcvxavq.bkt.clouddn.com/pweb'+deg_color+'Point1.png', new BMap.Size(25,25));
                                }
                                else if(json[i].typeCode==4||json[i].typeCode=='4'){
                                    typeCode = '特大级';
                                    icon = new BMap.Icon('http://ogbcvxavq.bkt.clouddn.com/pb/images/'+deg_color+'Point30.png', new BMap.Size(30,30));
                                }



                                labelContent = ptype;
                                title = json[i].dname;
                                infoContent=
                                        '<div class="infoBoxInfo">'+
                                        '<div class="infoBoxText">'+

                                        '<div class="infoBoxText_min">'+
                                        '<div class="infoName">编&nbsp;&nbsp;号：</div>'+
                                        '<div class="infoValue">'+json[i].number+'</div>'+
                                        '</div>'+

                                        '<div class="infoBoxText_min">'+
                                        '<div class="infoName">预警级别：</div>'+
                                        '<div class="infoValue">'+alertDegree+'</div>'+
                                        '</div>'+

                                        '<div class="infoBoxText_min">'+
                                        '<div class="infoName">有效雨量：</div>'+
                                        '<div class="infoValue">'+validRain+'</div>'+
                                        '</div>'+

                                        '<div class="infoBoxText_min">'+
                                        '<div class="infoName">隐患级别：</div>'+
                                        '<div class="infoValue">'+typeCode+'</div>'+
                                        '</div>'+

                                        '<div class="infoBoxText_min">'+
                                        '<div class="infoName">所属村镇：</div>'+
                                        '<div class="infoValue">'+json[i].xiang+'</div>'+
                                        '</div>'+

                                        '<div class="infoBoxText_min">'+
                                        '<div class="infoName">联 系 人：</div>'+
                                        '<div class="infoValue">'+json[i].dutypeople+'</div>'+
                                        '</div>'+

                                        '<div class="infoBoxText_min">'+
                                        '<div class="infoName">联系电话：</div>'+
                                        '<div class="infoValue">'+json[i].telephone+'</div>'+
                                        '</div>'+
                                        '</div>'+
                                        '<div class="infoBoxImg"><img onClick="checkPicture(this)" src=\"'+json[i].landImg+'?imageMogr2/thumbnail/500x500\" alt="图片暂无..."></div>'+
                                        '</div>'
                            }
                            ditu.addMarker(point,icon,labelContent,infoContent,title,ptype);
                        }
                    },
                    clearMap:function () {
                        map.clearOverlays();
                        gonggong.tuceng_all();
//                        ditu.getBoundry();
                    },
                    deleteMarker:function (label) {
                        console.log(label)
                        var allOverlay = map.getOverlays();
                        for(var i=0;i<allOverlay.length;i++){
                            if(allOverlay[i].toString()==='[object Marker]'){
                                if(allOverlay[i].getLabel().content==label.split('/')[0]){
                                    console.log('yes')
                                    map.removeOverlay(allOverlay[i]);
                                }
                            }
                        }
                    }
                };

                var gonggong = {
                    tuceng:function (type) {
                        var url = urlHead+'findLandInfoGeologyTypeList/'+type;
//                        var url = url_head+'findLandInfoGeologyTypeList/'+type;
                        $.ajax({ type:"GET",
                            url:url,
                            timeout : 30000,
                            dataType:"json",
                            success:function(data){
                                var json = eval(data);
                                for(var i=0; i<json.length; i++){
                                    var jpoint=json[i].lon;
                                    var wpoint=json[i].lat;
                                    var point=new BMap.Point(jpoint,wpoint);
                                    var title = json[i].dname;

                                    //确认使用的icon
                                    var icon = new BMap.Icon("http://ogbcvxavq.bkt.clouddn.com/pwebcollapsed.png", new BMap.Size(30,30));
                                    var typeC = '';
                                    var ptype = '';
                                    switch (type){
                                        case 1:
                                            icon = new BMap.Icon("http://ogbcvxavq.bkt.clouddn.com/pwebcollapsed.png?imageView2/0/w/20/h/20/imageslim", new BMap.Size(20,20));
                                            typeC = 'tc_坍塌';
                                            ptype = 'yhd_tc_tt';
                                            break;
                                        case 2:
                                            icon = new BMap.Icon("http://ogbcvxavq.bkt.clouddn.com/pwebunstableSlope1.png?imageView2/0/w/20/h/20/imageslim", new BMap.Size(20,20));
                                            typeC = 'tc_斜坡变形';
                                            ptype = 'yhd_tc_xpbx';
                                            break;
                                        case 3:
                                            icon = new BMap.Icon("http://ogbcvxavq.bkt.clouddn.com/pweblandslide.png?imageView2/0/w/20/h/20/imageslim", new BMap.Size(20,20));
                                            typeC = 'tc_滑坡';
                                            ptype = 'yhd_tc_hp';
                                            break;
                                        case 4:
                                            icon = new BMap.Icon("http://ogbcvxavq.bkt.clouddn.com/pwebmudSlides.png?imageView2/0/w/20/h/20/imageslim", new BMap.Size(20,20));
                                            typeC = 'tc_泥石流';
                                            ptype = 'yhd_tc_nsl';
                                            break;
                                    }


                                    var infoContent =
                                            '<div class="infoBoxInfo">' +
                                            '<div class="infoBoxText">' +
                                            '<div >编&nbsp;&nbsp;&nbsp;&nbsp;号：'+json[i].number+'</div>' +
                                            '<div >所&nbsp;&nbsp;&nbsp;&nbsp;属：'+json[i].xiang+json[i].cun+'</div>' +
                                            '<div >类&nbsp;&nbsp;&nbsp;&nbsp;别：'+typeC+'</div>' +
                                            '<div >联系人：'+json[i].dutypeople+'</div>' +
                                            '<div >手&nbsp;&nbsp;&nbsp;&nbsp;机：'+json[i].telephone+'</div>' +
                                            '</div>' +
                                            '</div>';

                                    var labelContent=typeC;
                                    ditu.addMarker(point,icon,labelContent,infoContent,title,ptype);
                                }
                            },
                            error:function() {
                                console.log("error");
                            },
                            beforeSend:function(){
                                $('#app').append(
                                        '<div class="showMes" id="showMes_gonggongTC">'+
                                        '<img src="http://ogbcvxavq.bkt.clouddn.com/wait.gif?imageslim">'+
                                        '</div>'
                                )
                            },
                            complete:function(){$("#showMes_gonggongTC").remove();}
                        })
                    },
                    tuceng_c:function (name) {
                        var selected = _this.tuceng;
                        var has = '';
                        for(var val of selected){
                            if(name===val){
                                has +=1;
                            }
                            else{
                            }
                        }
                        if(has==1){
                            var type = parseInt(name.split('/')[1])+1;
                            gonggong.tuceng(type)
                        }else{
                            ditu.deleteMarker(name);
                        }
                    },
                    tuceng_all:function () {
                        var selected = _this.tuceng;
                        for(var val of selected){
                            gonggong.tuceng(parseInt(val.split('/')[1])+1);
                        }
                    }
                };

                var land = {
                    yjcx:function () {
                        var date = $('.toolbar-skjc .date_pick_select_day').val();
                        var hour = $('.toolbar-skjc .date_pick_select_hour').val();
                        var full_date = date+hour;
                        var typeCode_text = $('.toolbar-skjc .level-btn-active').text();
                        console.log(typeCode_text)
                        var typeCode = '';
                        switch (typeCode_text){
                            case '特大':
                                typeCode = 4;
                                break;
                            case '重大':
                                typeCode = 3;
                                break;
                            case '中型':
                                typeCode = 2;
                                break;
                            case '小型':
                                typeCode = 1;
                                break;
                            case '所有':
                                typeCode = '';
                                break;
                        }
                        $.ajax({ type:"GET",
                            url:urlHead+"findLandInfoVilRain?dateCode="+full_date+"&typeCode="+typeCode,
//                            url:url_head+"findLandInfoVilRain?dateCode="+full_date+"&typeCode="+typeCode,
                            timeout : 30000,
                            dataType:"json",
                            success:function(data){
                                var json = eval(data);
                                if(typeCode===''){
                                    console.log('所有')
                                    ditu.addPoints(json,'oyhd'+typeCode);
                                }
                                else{
                                    ditu.addPoints(json,'oyhd'+typeCode);
                                }

                            },
                            error:function() {
                                console.log("error");
                            },
                            beforeSend:function(){
                                $('#app').append(
                                        '<div class="showMes" id="showMes_landYj">'+
                                        '<img src="http://ogbcvxavq.bkt.clouddn.com/wait.gif?imageslim">'+
                                        '</div>'
                                )
                            },
                            complete:function(){
                                $("#showMes_landYj").remove();
                            }
                        })
                    },
                    single_search:function () {
                        var dname = $('.toolbar-skjc .single_search_name').val();
                        var number = $('.toolbar-skjc .single_search_num').val();
                        var observTimes = $('.toolbar-skjc .date_pick_select_day').val() + $('.toolbar-skjc .date_pick_select_hour').val();

                        if(dname==''&&number==''){
                            alert('请输入隐患点名称或编号查询！')
                            return false;
                        }

                        $.ajax({ type:"GET",
                            url:urlHead+"land-detail-find",
//                            url:url_head+"land-detail-find",
                            timeout : 30000,
                            data:{"dname":dname,"number":number,"observTimes":observTimes},
                            dataType:"json",
                            success:function(data){
                                var json = eval(data);
                                if(json.data===null){
                                    alert('无数据！请检查输入内容!')
                                }else{
                                    var arr=[];
                                    arr.push(json.data);
                                    ditu.addPoints(arr,'s_yhd');
                                }

                            },
                            error:function() {
                                console.log("error");
                            },
                            beforeSend:function(){
                                $('#app').append(
                                        '<div class="showMes" id="showMes_landS">'+
                                        '<img src="http://ogbcvxavq.bkt.clouddn.com/wait.gif?imageslim">'+
                                        '</div>'
                                )
                            },
                            complete:function(){$("#showMes_landS").remove();}
                        })
                    },
                    ybcx:function () {
                        var time = $('.toolbar-zhyb select').val();
                        var typeCode_text = $('.toolbar-zhyb .level-btn-active').text();
                        var typeCode = '';
                        switch (typeCode_text){
                            case '特大':
                                typeCode = 4;
                                break;
                            case '重大':
                                typeCode = 3;
                                break;
                            case '中型':
                                typeCode = 2;
                                break;
                            case '小型':
                                typeCode = 1;
                                break;
                            case '所有':
                                typeCode = '';
                                break;
                        }
                        $.ajax({ type:"GET",
                            url:urlHead+"findLandInfoVilRain",
//                            url:url_head+"findLandInfoVilRain",
                            data:{'typeCode':typeCode},
                            timeout : 30000,
                            dataType:"json",
                            success:function(data){
                                var json = eval(data);
                                ditu.addPoints(json,'fyhd'+time);
                            },
                            error:function() {
                                console.log("error");
                            },
                            beforeSend:function(){
                                $('#app').append(
                                        '<div class="showMes" id="showMes_landYb">'+
                                        '<img src="http://ogbcvxavq.bkt.clouddn.com/wait.gif?imageslim">'+
                                        '</div>'
                                )
                            },
                            complete:function(){$("#showMes_landYb").remove();}
                        })
                    }
                };

                var station = {
                    // 雨量查询
                    addStation:function () {
                        var date = $('.toolbar-skjc .date_pick_select_day').val();
                        var hour = $('.toolbar-skjc .date_pick_select_hour').val();
                        var full_date = date+hour;
                        $.ajax({ type:"GET",
                            url:urlHead+'findByTimeStabtimeHistoryNo',
//                            url:url_head+'findByTimeStabtimeHistoryNo',
                            data:{'datetime':full_date},
                            timeout : 30000,
                            dataType:"json",
                            success:function(data){
                                var json = eval(data);
                                ditu.addPoints(json,'ylz');
                            },
                            error:function() {
                                console.log("error");
                            },
                            beforeSend:function(){
                                $('#app').append(
                                        '<div class="showMes" id="showMes_rainQ">'+
                                        '<img src="http://ogbcvxavq.bkt.clouddn.com/wait.gif?imageslim">'+
                                        '</div>'
                                )
                            },
                            complete:function(){
                                console.log('rainQ')
                                $("#showMes_rainQ").remove();
                            }
                        });
                    },
                    // 查询雨量总和
                    rainSum:function () {
                        var hour = $('.toolbar-ylcx select').val();
                        $.ajax({ type:"GET",
                            url:urlHead+'findStabtimeRainSum/'+hour,
//                            url:url_head+'findStabtimeRainSum/'+hour,
                            timeout : 30000,
                            dataType:"json",
                            success:function(data){
                                var json = data;
                                ditu.addPoints(json,'ylz_sum');
                            },
                            error:function() {
                                console.log("error");
                            },
                            beforeSend:function(){
                                $('#app').append(
                                        '<div class="showMes" id="showMes_rainS">'+
                                        '<img src="http://ogbcvxavq.bkt.clouddn.com/wait.gif?imageslim">'+
                                        '</div>'
                                )
                            },
                            complete:function(){$("#showMes_rainS").remove();}
                        })
                    },
                    // 等值线图
                    isoline:function () {
                        var date = $('.toolbar-ylfb .date_pick_select_day').val();
                        var hour = $('.toolbar-ylfb .date_pick_select_hour').val();
                        var full_date = date+hour;
                        if(full_date===0){
                            var year_now = new Date().getFullYear().toString();
                            var month_now = (new Date().getMonth()+1).toString();
                            var day_now = new Date().getDate().toString();
                            var hour_now = new Date().getHours().toString();
                            month_now = month_now < 10 ? '0'+month_now : month_now;
                            day_now = day_now < 10 ? '0'+day_now : day_now;
                            hour_now = hour_now < 10 ? '0'+hour_now : hour_now;
                            full_date = year_now+month_now+day_now+hour_now;
                        }


                        var val = _this.isoline_hour;

                        $.ajax({ type:"GET",
                            url:urlHead+"isoline-live-"+val+"h/"+full_date,
//                            url:url_head+"isoline-live-"+val+"h/"+full_date,
                            timeout : 30000,
                            dataType:"json",
                            success:function(content) {
                                if(content.length>0){
                                    for(var i=0;i<content.length;i++){
                                        var fillColor;
                                        switch (content[i].level){
                                            case 0:
                                                fillColor="#fcfdf5";
                                                break;
                                            case 1:
                                                fillColor="#c2f3b2";
                                                break;
                                            case 2:
                                                fillColor = "#6ec962";
                                                break;
                                            case 3:
                                                fillColor = "#8dcbfe";
                                                break;
                                            case 4:
                                                fillColor = "#494bde";
                                                break;
                                            case 5:
                                                fillColor = "#fb4ce7";
                                                break;
                                            case 6:
                                                fillColor = "#ad4371";
                                                break;
                                        }
                                        var polygon_outer = new BMap.Polygon(content[i].outer+content[i].outer.split(";")[0], {
                                            strokeColor: "none",
                                            strokeWeight: 2,
                                            strokeOpacity: 0.5,
                                            fillColor: fillColor,
                                            fillOpacity:0.5
                                        });  //创建外层多边形
                                        map.addOverlay(polygon_outer);
                                        if(content[i].inner && content[i].inner !="null"){
                                            // 因为inner是数组，与outer不同
                                            for(var j=0;j<content[i].inner.length;j++){
                                                var polygon_inner = new BMap.Polygon(content[i].inner[j]+content[i].inner[j].split(";")[0], {
                                                    strokeColor: "none",
                                                    strokeWeight: 2,
                                                    strokeOpacity: 0.5,
                                                    fillColor: "#f5f3f0",
                                                    fillOpacity:0.7
                                                });  //创建内层多边形
                                                map.addOverlay(polygon_inner);
                                            }
                                        }
                                    }
                                }else{
                                    console.log("没有下雨！")
                                }
                            },
                            error:function(data) {
                                console.log(data);
                            },
                            beforeSend:function(){
                                $('#app').append(
                                        '<div class="showMes" id="showMes_rainI">'+
                                        '<img src="http://ogbcvxavq.bkt.clouddn.com/wait.gif?imageslim">'+
                                        '</div>'
                                )
                            },
                            complete:function(){$("#showMes_rainI").remove();}
                        })
                    },
                };

                setTimeout(function () {
                    ditu.getBoundry1();
                    land.yjcx();
                    station.addStation();
                    _this.points_count();

//                    实况监测---------------------------------------
                    $('.left-block').on('click','#skjc',function () {
                        setTimeout(function () {
                            ditu.clearMap();
                            ditu.getBoundry1();
                            land.yjcx();
                            station.addStation();
                        },100);

                    });
//                    时间改变
                    $('.right-block').on('change','.toolbar-skjc .date-pick select',function () {
                        setTimeout(function () {
                            ditu.clearMap();
                            ditu.getBoundry1();
                            land.yjcx();
                            station.addStation();
                            _this.points_count();
                        },100);

                    });
//                    等级改变
                    $('.right-block').on('click','.toolbar-skjc .level-change button',function () {
                        setTimeout(function () {
                            ditu.clearMap();
                            ditu.getBoundry1();
                            land.yjcx();
                            station.addStation();
                        },100);

                    });
//                    单个查询
                    $('.right-block').on('click','.toolbar-skjc .single-search button',function () {
                        setTimeout(function () {
                            ditu.clearMap();
                            ditu.getBoundry1();
                            land.single_search();
                        },100);

                    });

//                    灾害预报---------------------------------------
                    $('.left-block').on('click','#zhyb',function () {
                        setTimeout(function () {
                            ditu.clearMap();
                          ditu.getBoundry1();
                            land.ybcx();

                        },100);

                    });
                    $('.right-block').on('change','.toolbar-zhyb .hour-pick select',function () {
                        setTimeout(function () {
                            ditu.clearMap();
                          ditu.getBoundry1();
                            land.ybcx();
                        },100);

                    });
                    $('.right-block').on('click','.toolbar-zhyb .level-change button',function () {
                        setTimeout(function () {
                            ditu.clearMap();
                          ditu.getBoundry1();
                            land.ybcx();
                        },100);

                    });


//                    雨量查询---------------------------------------
                    $('.left-block').on('click','#ylcx',function () {
                        setTimeout(function () {
                            ditu.clearMap();
                          ditu.getBoundry1();
                            station.rainSum();

                        },100);

                    });
                    $('.right-block').on('change','.toolbar-ylcx .hour-sum select',function () {
                        setTimeout(function () {
                            ditu.clearMap();
                          ditu.getBoundry1();
                            station.rainSum();
                        },100);

                    });

//                    雨量分布---------------------------------------
                    $('.left-block').on('click','#ylfb',function () {
                        setTimeout(function () {
                            ditu.clearMap();
                          ditu.getBoundry();
                            station.isoline();
                        },50);

                    });
                    $('.right-block').on('change','.toolbar-ylfb .date-pick select',function () {
                        setTimeout(function () {
                            ditu.clearMap();
                          ditu.getBoundry();
                            station.isoline();
                        },100);

                    });
                    $('.right-block').on('change','.toolbar-ylfb .hour-pick input',function () {
                        setTimeout(function () {
                            ditu.clearMap();
                          ditu.getBoundry();
                            station.isoline();
                        },100);

                    });


//                    图层---------------------------------------
                    $('.tuceng').on('click','.tuceng-cell label',function () {
                        var name = $(this).prev().val();
                        setTimeout(function () {
                            gonggong.tuceng_c(name);
                        },50);
                    });

                },100);

            },
            points_count(){
                setTimeout(function () {
                    var date_select = $('.toolbar-skjc .date_pick_select_day').val().toString();
                    var hour_select = $('.toolbar-skjc .date_pick_select_hour').val().toString();
                    var dateCode = date_select+hour_select;
                    console.log(dateCode);
                    $.ajax({ type:"GET",
                        url:urlHead+"findLandInfoVilRain",
//                        url:urlHead+"findLandInfoVilRain",
                        data:{dateCode:dateCode,alertDegree:'1,2,3,4'},
                        timeout : 30000,
                        dataType:"json",
                        success:function(data){
                            var json = eval(data);
                            var red = 0,orange = 0,yellow = 0,blue = 0;
                            for(var i=0;i<json.length;i++){
                                if(json[i].alertDegree==='4'){
                                    red+=1;
                                }
                                if(json[i].alertDegree==='3'){
                                    orange+=1;
                                }
                                if(json[i].alertDegree==='2'){
                                    yellow+=1;
                                }
                                if(json[i].alertDegree==='1'){
                                    blue+=1;
                                }
                            }
                            console.log(red+'/'+orange+'/'+yellow+'/'+blue)
                            $(".legend-point-cell .legend-red").html(red);
                            $(".legend-point-cell .legend-orange").html(orange);
                            $(".legend-point-cell .legend-yellow").html(yellow);
                            $(".legend-point-cell .legend-blue").html(blue);

                        },
                        error:function() {
                            console.log("error");
                        },
                        beforeSend:function(){
                            $('.legend-point').append(
                                    '<div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.2);text-align: center;" id="showMes_landTJ">'+
                                    '<img src="http://ogbcvxavq.bkt.clouddn.com/wait.gif?imageslim" style="height: 80%;margin-top: 10%;">'+
                                    '</div>'
                            )
                        },
                        complete:function(){$("#showMes_landTJ").remove();}
                    })
                },50);
            }
        },
        mounted(){
            this.initMap();
        }
    }
</script>
