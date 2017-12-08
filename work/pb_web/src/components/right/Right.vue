<style>
    .right-block{border-left: solid 1px #dcdcdc;position: relative;}
    .toolbar-box{width: 13rem;}
    .card-action{padding:0 0.5rem !important;}
    .card-content{padding: 0.5rem !important;}
    .legend{position: absolute;bottom: 0;width: 100%;left: 0;}
    .legend .col{padding: 0;text-align: left;}
    .legend .col img{width: 1rem;height: 1rem;position: relative;top: 0.1rem;left: -0.2rem;}
    .legend-isoline-color{width: 3rem;height: 2rem;margin-left: 3rem;}
    .legend-isoline-text{position: relative;line-height: 2rem;left: 0.5rem;top: 1rem;}
    .toggle-toolbar-box{position: absolute;left: -3rem;width: 0;line-height: 4rem;top: 50%;margin-top: -2rem;font-size: 1.2rem;color: white;text-indent: 0.2rem;cursor: pointer;
    border-top: solid 1rem transparent;border-right: solid 1.5rem rgba(66, 165, 245, 0.57);border-bottom: solid 1rem transparent;border-left: solid 1rem transparent;font-weight: bold;
    }
    .toggle-toolbar-box:hover{border-right: solid 1.5rem rgb(66, 165, 245);}
    .legend-point-cell{line-height: 2rem;}
    .legend-point-cell sup{cursor:pointer;font-weight: bold;font-size: 1rem;color: darkred;}
</style>

<template>
    <div class="right-block" v-show="now_path==='skjc'||now_path==='zhyb'||now_path==='ylcx'||now_path==='ylfb'">
        <div class="toolbar-box" v-show="show_toolbar">
            <!--实况监测toolbar-->
            <div class="toolbar-skjc" v-if="now_path==='skjc'">
                <v-date-pick-extend>
                    <div slot="title"><i class="fa fa-calendar-plus-o purple-text"></i> 预警时间</div>
                </v-date-pick-extend>
                <v-level-change></v-level-change>
                <v-single-search></v-single-search>
            </div>
            <!--灾害预报toolbar-->
            <div class="toolbar-zhyb" v-if="now_path==='zhyb'">
                <v-hour-pick></v-hour-pick>
                <v-level-change></v-level-change>
            </div>

            <!--雨量查询toolbar-->
            <div class="toolbar-ylcx" v-if="now_path==='ylcx'">
                <v-hour-sum></v-hour-sum>
            </div>
            <!--雨量分布toolbar-->
            <div class="toolbar-ylfb" v-if="now_path==='ylfb'">
                <v-change-1h24h></v-change-1h24h>
                <v-date-pick-extend>
                    <div slot="title"><i class="fa fa-calendar-plus-o purple-text"></i> 等值线日期</div>
                </v-date-pick-extend>
            </div>


            <!--隐患点图例-->
            <div class="card legend legend-point" v-show="now_path==='skjc'">
                <div class="card-action blue lighten-1 white-text">
                    <i class="fa fa-map-marker purple-text"></i> 隐患点图例
                </div>
                <div class="card-content" style="text-align: center;">
                    <div class="row" style="margin-bottom: 0;">
                        <div class="col s6 legend-point-cell">
                            <img src="//qiniu.jyblue.com/pwebmonitoringStation.png?imageslim">雨量站
                        </div>
                        <div class="col s6 legend-point-cell">
                            <img src="//qiniu.jyblue.com/pwebgreenicon.png?imageslim">无警戒
                        </div>
                        <div class="col s6 legend-point-cell">
                            <img src="//qiniu.jyblue.com/pwebredPoint.png?imageslim">红色 
                            <sup class="legend-red"></sup>
                        </div>
                        <div class="col s6 legend-point-cell">
                            <img src="//qiniu.jyblue.com/pweborangePoint.png?imageslim">橙色 
                            <sup class="legend-orange"></sup>
                        </div>
                        <div class="col s6 legend-point-cell">
                            <img src="//qiniu.jyblue.com/pwebyellowPoint.png?imageslim">黄色 
                            <sup class="legend-yellow"></sup>
                        </div>
                        <div class="col s6 legend-point-cell">
                            <img src="//qiniu.jyblue.com/pwebbluePoint.png?imageslim">蓝色 
                            <sup class="legend-blue"></sup>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card legend legend-point-zhyb" v-show="now_path==='zhyb'||now_path==='ylcx'">
                <div class="card-action blue lighten-1 white-text">
                    <i class="fa fa-map-marker purple-text"></i> 隐患点图例
                </div>
                <div class="card-content" style="text-align: center;">
                    <div class="row" style="margin-bottom: 0;">
                        <div class="col s6 legend-point-cell">
                            <img src="//qiniu.jyblue.com/pwebmonitoringStation.png?imageslim">雨量站
                        </div>
                        <div class="col s6 legend-point-cell">
                            <img src="//qiniu.jyblue.com/pwebgreenicon.png?imageslim">无警戒
                        </div>
                        <div class="col s6 legend-point-cell">
                            <img src="//qiniu.jyblue.com/pwebredPoint.png?imageslim">红色
                        </div>
                        <div class="col s6 legend-point-cell">
                            <img src="//qiniu.jyblue.com/pweborangePoint.png?imageslim">橙色
                        </div>
                        <div class="col s6 legend-point-cell">
                            <img src="//qiniu.jyblue.com/pwebyellowPoint.png?imageslim">黄色
                        </div>
                        <div class="col s6 legend-point-cell">
                            <img src="//qiniu.jyblue.com/pwebbluePoint.png?imageslim">蓝色
                        </div>
                    </div>
                </div>
            </div>
            <!--等值线图例-->
            <div class="card legend legend-isoline" v-show="now_path==='ylfb'">
                <div class="card-action blue lighten-1 white-text">
                    <i class="fa fa-area-chart purple-text"></i> 等值线图例
                </div>
                <div class="card-content" style="text-align: center;">
                    <div class="row" style="margin-bottom: 0;">
                        <div class="col s6">
                            <div class="legend-isoline-color" style="background: rgb(173, 67, 113);"></div>
                            <div class="legend-isoline-color" style="background: rgb(251, 76, 231);"></div>
                            <div class="legend-isoline-color" style="background: rgb(73, 75, 222);"></div>
                            <div class="legend-isoline-color" style="background: rgb(141, 203, 254);"></div>
                            <div class="legend-isoline-color" style="background: rgb(110, 201, 98);"></div>
                            <div class="legend-isoline-color" style="background: rgb(194, 243, 178);"></div>
                            <div class="legend-isoline-color" style="background: rgb(252, 253, 245);"></div>
                        </div>
                        <div class="col s6" v-show="isoline_hour==='24'">
                            <div class="legend-isoline-text">250</div>
                            <div class="legend-isoline-text">100</div>
                            <div class="legend-isoline-text">50</div>
                            <div class="legend-isoline-text">25</div>
                            <div class="legend-isoline-text">10</div>
                            <div class="legend-isoline-text">0.1</div>
                        </div>
                        <div class="col s6" v-show="isoline_hour==='1'">
                            <div class="legend-isoline-text">50</div>
                            <div class="legend-isoline-text">40</div>
                            <div class="legend-isoline-text">15</div>
                            <div class="legend-isoline-text">7</div>
                            <div class="legend-isoline-text">1.6</div>
                            <div class="legend-isoline-text">0.1</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="toggle-toolbar-box" @click="toggle_toolbar($event)">
            <i class="fa fa-angle-double-right"></i>
        </div>
    </div>
</template>

<script>
    import Date_pick from '@/components/right/Date_pick'
    import Date_pick_extend from '@/components/right/Date_pick_extend'
    import Level_change from '@/components/right/Level_change'
    import Single_search from '@/components/right/Single_search'
    import Hour_pick from '@/components/right/Hour_pick'
    import Hour_sum from '@/components/right/Hour_sum'
    import Change_1h24h from '@/components/right/Change_1h24h'
    export default {
        name: '',
        data () {
            return {
                show_toolbar:true
            }
        },
        components:{
            'v-date-pick':Date_pick,'v-date-pick-extend':Date_pick_extend,'v-level-change':Level_change,'v-single-search':Single_search,'v-hour-pick':Hour_pick,
            'v-hour-sum':Hour_sum,'v-change-1h24h':Change_1h24h
        },
        computed:{
            now_path () {
                return this.$store.state.now_path
            },
            isoline_hour () {
                return this.$store.state.isoline_hour
            }
        },
        methods:{
            toggle_toolbar(e){
                if(this.show_toolbar===true){
                    this.show_toolbar = false;
                    e.currentTarget.firstChild.classList.remove('fa-angle-double-right')
                    e.currentTarget.firstChild.classList.add('fa-angle-double-left')
                }
                else{
                    this.show_toolbar = true;
                    e.currentTarget.firstChild.classList.remove('fa-angle-double-left')
                    e.currentTarget.firstChild.classList.add('fa-angle-double-right')
                }
            }
        },
        mounted(){

        }
    }
</script>
