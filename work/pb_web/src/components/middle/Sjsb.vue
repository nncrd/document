<style>
    /*.sjsb input,.sjsb textarea,.sjsb select{border-radius: 0.3rem;padding: 0.3rem;}*/
    .fa-exclamation-circle{color: red;}

    .sjsb-cell{padding: 0.5rem;box-sizing: border-box;}
        .sjsb-cell .row{margin-bottom: 0;}
        .sjsb-cell-title{margin: 0.5rem 0;background: linear-gradient(to right,#58B7FF,#fafafa 8rem);line-height: 2rem;padding-left: 0.5rem;border-radius: 0.3rem;}
        .sjsb-cell-content{padding: 0 0.5rem;}
        .sjsb-cell p{margin: 0;}
        .sjsb-cell textarea{width: 100%;box-sizing: border-box;height: 8.5rem;}
        .sjsb-cell select{height: 2rem;margin-bottom: 0.5rem;}

        .sjsb-time .sjsb-cell-content p{width: 10rem;float: left;}

        .image-box{border-radius: 0.3rem; border: solid 1px #dcdcdc;padding: 0.5rem;}
            .image-box-min img{max-width: 4rem;min-height: 3.5rem;}
            .video-box-min video{max-width: 4rem;min-height: 3.5rem;margin:0 .5em;}
            .image-cell{width: 4rem;height: 3.5rem;float: left;margin-right: 0.5rem;border-radius: 0.3rem;overflow: hidden;}
            .image-plus{text-align: center;line-height: 3.5rem;border: dashed 1px #666666;box-sizing: border-box;font-size: 2rem;color: #666666;cursor: pointer;margin: 0 0.5rem 0 0 !important;}
            .image-plus:hover{color: #B33EF9;border:dashed 1px #B33EF9;}

        .sjsb-other i{font-size: 1.5rem;color: #B33EF9;position: relative;top: 0.3rem;}

        .sjsb-btn{text-align: center;}
</style>

<template>
    <div class="sjsb middle-box">

        <div class="sjsb-title right-title">
            事件上报
        </div>
        <div style="padding: 0.5rem 0 0.5rem 1rem;color: #B33EF9;">
            带 <i class="fa fa-exclamation-circle"></i> 为必填项！
        </div>
        <form class="pure-form" action="../../upInfomatin" accept-charset="utf-8" method="post" enctype="multipart/form-data" id="disasterAdd-form">
            <div class="row">
                <div class="sjsb-time sjsb-cell col s3" >
                    <div class="sjsb-cell-title">
                        <i class="fa fa-exclamation-circle"></i> 发生时间
                    </div>
                    <div class="sjsb-cell-content">
                        <v-date-pick>
                            <div slot="title"></div>
                        </v-date-pick>
                    </div>
                </div>

                <div class="sjsb-address sjsb-cell col s3" >
                    <div class="sjsb-cell-title">
                        <i class="fa fa-exclamation-circle"></i> 发生地点
                    </div>
                    <div class="sjsb-cell-content card">
                        <div class="card-content">
                            <div>
                                <p style="font-size: 0.8rem;color: #999999 !important"><i class="fa fa-skyatlas purple-text"></i> 选择城镇 <i class="fa fa-skyatlas purple-text"></i></p>
                                <select class="sjsb-xiang browser-default" v-model="xiang_selected" @change="get_cun">
                                    <option v-for="x in xiang" :value="x.typecode">{{x.name}}</option>
                                </select>
                            </div>
                            <div>
                                <p style="font-size: 0.8rem;color: #999999 !important"><i class="fa fa-skyatlas purple-text"></i> 选择乡村 <i class="fa fa-skyatlas purple-text"></i></p>
                                <select class="sjsb-cun browser-default" name="village">
                                    <option v-for="c in cun" :value="c.name">{{c.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sjsb-assume sjsb-cell col s6" >
                    <div class="sjsb-cell-title">
                        <i class="fa fa-exclamation-circle"></i> 事件描述
                    </div>
                    <div class="sjsb-cell-content">
                        <textarea name="assume" @select="aaa($event)" ></textarea>
                    </div>
                </div>

                <div class="sjsb-image sjsb-cell col s12" >
                    <div class="sjsb-cell-title">
                        图片选择<i style="color: #B33EF9;font-size: 0.9rem;margin-left: 6rem;">不支持连续添加图片，若要传多张图片，请一次选择多张！</i>
                    </div>
                    <div class="sjsb-cell-content">
                        <div class="image-box">
                            <label class="image-cell image-plus" for="img-files">
                                <i class="fa fa-plus"></i>
                            </label>
                            <input type='file' id="img-files" style="display: none;" multiple name="file" accept="image/*" @change="selectFile($event)">
                            <div class="image-box-min">

                            </div>
                            <div class="clear-both"></div>
                        </div>
                    </div>
                </div>

                <div class="sjsb-image sjsb-cell col s12" >
                    <div class="sjsb-cell-title">
                        视频选择<i style="color: #B33EF9;font-size: 0.9rem;margin-left: 6rem;">不支持连续添加视频，若要传多部视频，请一次选择多部！</i>
                    </div>
                    <div class="sjsb-cell-content">
                        <div class="image-box">
                            <label class="image-cell image-plus" for="video-files">
                                <i class="fa fa-plus"></i>
                            </label>
                            <input type='file' id="video-files" style="display: none;" multiple name="videoFile" accept="video/*" @change="selectVideo($event)">
                            <div class="video-box-min">

                            </div>
                            <div class="clear-both"></div>
                        </div>
                    </div>
                </div>

                <div class="sjsb-other sjsb-cell col s12" >
                    <div class="sjsb-cell-title">
                        其他信息<i style="color: #B33EF9;font-size: 0.9rem;margin-left: 6rem;">若您的上报被采用，有机会获得奖励，留下信息以供我们联系您！</i>
                    </div>
                    <div class="sjsb-cell-content row">
                        <div class="input-field col s6" style="position: relative;">
                            <i class="fa fa-user-secret" style="position: absolute;right: 1rem;top: 1rem;"></i>
                            <input type="text"  name="userName" id="userName">
                            <label for="userName">姓名</label>
                        </div>
                        <div class="input-field col s6" style="position: relative;">
                            <i class="fa fa-tty" style="position: absolute;right: 1rem;top: 1rem;"></i>
                            <input type="text"  name="phoneNum" id="phoneNum">
                            <label for="phoneNum">电话</label>
                        </div>
                    </div>
                </div>

            </div>


        </form>
        <div style="height: 0.1rem;background: linear-gradient(to right,#fafafa,#B33EF9,#fafafa);margin: 1rem 0;"></div>
        <div class="sjsb-btn">
            <button type="button" class="waves-effect waves-light btn blue lighten-1" @click="shangbao">上 报</button>
        </div>



    </div>
</template>

<script>
    import Date_pick from '@/components/right/Date_pick'

//    var urlHead = 'http://www.uulead.com/pb-web/';
                    var urlHead = '../../';
    export default {
        name: 'sjsb',
        data () {
            return {
                xiang:[],
                cun:[],
                xiang_selected:'qsz',
                action:urlHead+'upInfomatin'

            }
        },
        components:{
            'v-date-pick':Date_pick
        },
        methods:{
            aaa(e){
                var target = e.target;
                var selectedText = this.getSelectedText();
                var text = target.value;
                text = text.replace(selectedText,' $'+selectedText+'$ ');
                target.value = text;
            },
            getSelectedText() {
                var txt = "";
                if (window.getSelection) {
                    txt = window.getSelection().toString();
                } else if (window.document.getSelection) {
                    txt = window.document.getSelection().toString();
                } else if (window.document.selection) {
                    txt = window.document.selection.createRange().text;
                }
                return txt;
            },
            get_zhen(){
                this.$http({
                    method:'GET',
                    url:urlHead+'findXiangInfo'
//                    url:urlHead+'findXiangInfo'
                }).then(function(data){
                    this.xiang = data.body;
                },function (err) {
                    console.log(err)
                })
            },
            get_cun(){
                var parentCode = this.xiang_selected;
                this.$http({
                    method:'GET',
                    url:urlHead+'findCunInfo',
//                    url:urlHead+'/findCunInfo',
                    params:{parentCode:parentCode}
                }).then(function(data){
                    this.cun = data.body;
                },function (err) {
                    console.log(err)
                })
            },
            selectFile($event){
                $(".image-box-min").html("");
                if(typeof FileReader == 'undefined'){
                    $(".image-box-min").html("你的浏览器不支持FileReader接口！功能无法正常使用！")
                    //使选择控件不可操作
                }
                var files = $event.target.files;
                for(var i=0;i<files.length;i++){
                    if(!/image\/\w+/.test(files[i].type)){
                        alert("格式不正确，请选择图片！");
                        return false;
                    }
                    var reader = new FileReader();
                    //将文件以Data URL形式读入页面
                    reader.readAsDataURL(files[i]);
                    reader.onload=function(e){
                        var result=document.getElementById("result");
                        //显示文件
                        $(".image-box-min").append(
                                '<div class="image-cell">'+
                                    '<img src="'+this.result+'">'+
                                '</div>'
                        )
                    }
                }
            },
            selectVideo($event){
                $(".video-box-min").html("");
                if(typeof FileReader == 'undefined'){
                    $(".image-box-min").html("你的浏览器不支持FileReader接口！功能无法正常使用！")
                    //使选择控件不可操作
                }
                var files = $event.target.files;
                for(var i=0;i<files.length;i++){
                    if(!/video\/\w+/.test(files[i].type)){
                        alert("格式不正确，请选择视频！");
                        return false;
                    }
                    console.log(files[i].size)
                    if(files[i].size>50*1024*1024)
                    {
                        alert("请上传小于50M的视频!");
                        return false;
                    }
                    var reader = new FileReader();
                    //将文件以Data URL形式读入页面
                    reader.readAsDataURL(files[i]);
                    reader.onload=function(e){
                        var result=document.getElementById("result");
                        //显示文件
                        $(".video-box-min").append(
                            '<video controls="controls"><source src="'+this.result+'"></video>'
                        )
                    }
                }
            },
            shangbao(){
//                swal("", "", "");//加载中
                $("#disasterAdd-form").ajaxSubmit({
                    data:{
                        town:$(".sjsb-xiang").find("option:selected").text()
                    },
                    beforeSend:function(){
                        $('#app').append(
                                '<div class="showMes" id="showMes_sjsb">'+
                                '<img src="//qiniu.jyblue.com/wait.gif?imageslim">'+
                                '</div>'
                        )
                    },
                    complete:function(){$("#showMes_sjsb").remove();},
                    success: function(data) {
                        console.log(data);
                        if(data.code == 0)  {
                            alert("上报成功");
                            //window.location.href("../html/disasterUpload.html");
//                            window.opener=null;
//                            window.close();
//                            $('#disasterIframe2',parent.document).hide();
                        }else {
//                            console.log('1111')
                            alert("上报失败");
//                            $('#disasterIframe2',parent.document).hide();
                        }
                    }
                    ,error:function (err) {
                        alert('上报失败！'+'\n错误：'+err)
                    }

                })
            }
        },
        mounted(){
            this.get_zhen();
            this.get_cun();
        }
    }
</script>