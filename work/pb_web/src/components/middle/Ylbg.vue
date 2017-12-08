<style>
    .ylbg-xiang-zhan input{display: none;}
    .ylbg-xiang-zhan label{display: block;line-height: 2rem;cursor: pointer;margin-right: 2rem;}
    .ylbg-xiang-zhan label i{color: #999999;line-height: 2rem;font-size: 1.1rem;position: absolute;right: 0.5rem;top: 0;}
    .xiang-zhan-active,.xiang-zhan-active i{color: #B33FF9 !important;}

    .ylbg{}
        .ylbg-xiang-zhan{margin: 0.5rem;display: -webkit-box;display: flex;}
            .ylbg-xiang-to-zhan{text-align: center;font-size: 2rem;color: #B33FF9;line-height: 10.2rem;width: 5rem;}
            .ylbg-xiang,.ylbg-zhan{border-radius: 0.3rem;border: solid 1px #dcdcdc;box-sizing: border-box;height: 10.2rem;overflow-y: auto;flex: 1;}
                .xiang-cell{width: 25%;float: left;padding: 0 0.5rem;box-sizing: border-box;position: relative;}
                    .xiang-cell label{margin-right: 0;}
                .zhan-cell{width: 50%;float: left;padding: 0 0.5rem;box-sizing: border-box;position: relative;font-size: 0.8rem;}
                    .zhan-cell label{line-height: 1.5rem;}
                    .zhan-cell label i{font-size: 0.8rem;line-height: 1.5rem;}

        .ylbg-time{margin: 0.5rem;border: solid 1px #dcdcdc;padding: 0.5rem;border-radius: 0.3rem;display: -webkit-box;display: flex;}
            .ylbg-time .card{margin: 0;}
            .ylbg-time-over{margin-left: 1rem;}
            .ylbg-time-begin,.ylbg-time-over,.ylbg-caozuo{flex: 1;}
            .ylbg-time p{margin: 0;width: 9rem;float: left;}
                .ylbg-time select{border-radius: 0.3rem;margin-top: 0.2rem;}
            .ylbg-time-title{}
        .ylbg-caozuo{position: relative;}
            .ylbg-caozuo .ylbg-time-search{position: absolute;right: 7rem;bottom: 0;}
            .ylbg-caozuo .ylbg-time-output{position: absolute;right: 0;bottom: 0;}

        .ylbg-table{margin: 0.5rem;box-shadow: 0 0 0.2rem rgba(0,0,0,0.6);height: 10rem;}
            .ylbg-table-header,.ylbg-table-body{width: 100%;overflow-y: auto;}
                .ylbg-table-body table{width: 100%;}
                .ylbg-table-header td{background: lightblue;font-weight: bold;line-height: 2rem;padding: 0 0 0 0.5rem;}
                .ylbg-table-body td{padding:0.5rem 0 0 0.5rem;}

</style>

<template>
    <div class="ylbg middle-box">
        <div class="ylbg-title right-title">
            雨量表格
        </div>
        <div class="ylbg-xiang-zhan">
            <div class="ylbg-xiang">
                <div class="xiang-cell" v-for="item in xiang" >
                    <label :for="item.typecode" @click="get_zhan(item.typecode,$event)">
                        {{item.name}} <!-- <i class="fa fa-check-circle-o"></i> -->
                    </label>
                    <input type="checkbox" :id="item.typecode">
                </div>
            </div>
            <div class="ylbg-xiang-to-zhan">
                <i class="fa fa-long-arrow-right"></i>
            </div>
            <div class="ylbg-zhan">
                <div class="zhan-cell" v-for="item in zhan">
                    <label @click="select_zhan(item.stationnum,$event)" :for="item.stationnum" class="xiang-zhan-active">
                        {{item.stationname}} <!-- <i class="fa fa-check-circle-o"></i> -->
                    </label>
                    <input type="checkbox" :value="item.stationnum" :id="item.stationnum" checked>
                </div>
            </div>
        </div>

        <div class="ylbg-time" >
            <div class="ylbg-time-begin">
                <v-date-pick>
                    <div slot="title"><i class="fa fa-calendar-plus-o purple-text"></i> 起始时间</div>
                </v-date-pick>
            </div>
            <div class="ylbg-time-over">
                <v-date-pick>
                    <div slot="title"><i class="fa fa-calendar-plus-o purple-text"></i> 结束时间</div>
                </v-date-pick>
            </div>
            <div class="ylbg-caozuo">
                <button class="waves-effect waves-light btn btn-small ylbg-time-search blue lighten-2" @click="get_table">搜索</button>
                <button class="waves-effect waves-light btn btn-small ylbg-time-output red" @click="downloadExcel">导出</button>
            </div>
        </div>

        <div class="ylbg-table">
            <table class="ylbg-table-header">
                <tr>
                    <td width="10%">站号</td>
                    <td width="65%">站名</td>
                    <td width="15%">累计雨量</td>
                    <td width="10%">站类型</td>
                </tr>
            </table>
            <div class="ylbg-table-body">
                <table >
                    <tr v-for="item in table_figures">
                        <td width="10%">{{item.stationNum}}</td>
                        <td width="65%">{{item.stationName}}</td>
                        <td width="15%">{{item.precipitation}}</td>
                        <td width="10%">{{item.statoionType}}</td>
                    </tr>
                </table>
            </div>

        </div>
    </div>
</template>

<script>
    import Date_pick from '@/components/right/Date_pick'

    export default {
        name: 'ylbg',
        data () {
            return {
                xiang:[],
                zhan:[],
                table_figures:[]
            }
        },
        components:{
          'v-date-pick':Date_pick
        },
        methods:{
            get_xiang(){
                this.$http({
                    method:'GET',
//                    url:urlHead+'findXiangInfo'
                    url:urlHead+'findXiangInfo'
                }).then(function(data){
                    this.xiang = data.body;
                    console.log(this.xiang[0]);
                },function (err) {
                    console.log(err)
                })
            },
            get_zhan(val,$event){
                var _this = this;
                setTimeout(function () {
                    if($('#'+val).is(":checked")){
                        $event.target.classList.add("xiang-zhan-active");
                        _this.$http({
                            method:'GET',
//                            url:urlHead+'findObservationStationVillage?townshipCode='+val
                            url:urlHead+'findObservationStationVillage?townshipCode='+val
                        }).then(function(data){
                            this.zhan = data.body.concat(_this.zhan);
                            console.log(this.zhan)
                        },function (err) {
                            console.log(err)
                        })

                    }else{
                        $event.target.classList.remove("xiang-zhan-active");
                        _this.zhan = _this.zhan.filter(t => t.townshipcode != val)
                    }
                },50);


            },
            select_zhan(val,$event){
                setTimeout(function () {
                    console.log(this)
                    if($('#'+val).is(":checked")){
                        $event.target.classList.add("xiang-zhan-active");
                        console.log(val)
                    }else{
                        $event.target.classList.remove("xiang-zhan-active");
                    }
                },50)

            },
            get_table(){
                var b_day = $('.ylbg-time-begin .date_pick_select_day').val();
                var b_hour = $('.ylbg-time-begin .date_pick_select_hour').val();
                var e_day = $('.ylbg-time-over .date_pick_select_day').val();
                var e_hour = $('.ylbg-time-over .date_pick_select_hour').val();
                var datetime = b_day + b_hour;
                var endDatetime = e_day + e_hour;
                if(datetime > endDatetime){
                    alert('起始时间不能大于结束时间！');
                    return false;
                }
                var stationNum = '';
                $(".ylbg-zhan input").each(function(){
                    if($(this).is(':checked')){
                        stationNum+=$(this).val()+",";
                    }
                });

                this.$http({
//                    url:urlHead+'findStabtimeHistoryByTime',
                    url:urlHead+'findStabtimeHistoryByTime',
                    params:{'datetime':datetime,'endDatetime':endDatetime,'stationNum':stationNum},
                }).then(function (data) {
                    console.log(data)
                    console.log(data.body)
                    console.log(data.body.data)
                    this.table_figures = data.body.data;
                    console.log(this.table_figures)
                },function (err) {
                    console.log(err)
                })
            },
            downloadExcel(){
                $("#tbody").html("");
                var b_day = $('.ylbg-time-begin .date_pick_select_day').val();
                var b_hour = $('.ylbg-time-begin .date_pick_select_hour').val();
                var e_day = $('.ylbg-time-over .date_pick_select_day').val();
                var e_hour = $('.ylbg-time-over .date_pick_select_hour').val();
                var datetime = b_day+b_hour;
                var endDatetime = e_day+e_hour;
                if(datetime > endDatetime){
                    alert('起始时间不能大于结束时间！');
                    return false;
                }
                var selectStation="";
                $(".ylbg-zhan input").each(function(){
                    if($(this).is(':checked')){
                        selectStation+=$(this).val()+",";
                    }
                });

                selectStation=selectStation.substring(0,selectStation.length-1);
                var myUrl="../stabtimeExportExcel?datetime="+datetime+"&endDatetime="+endDatetime;
                if(selectStation.length>0){
                    myUrl="../stabtimeExportExcel?datetime="+datetime+"&endDatetime="+endDatetime+"&stationNum="+selectStation;
                }
                window.open(myUrl);
                //$("body").append($("<iframe/>").attr("src",myUrl));
            }
        },
        mounted(){
            this.get_xiang();
            setTimeout(function () {
                $('.ylbg-table').height($(window).height()/3);
                $('.ylbg-table-body').height($('.ylbg-table').height()-$('.ylbg-table-header').height()-5);
            },50)
        }
    }
</script>