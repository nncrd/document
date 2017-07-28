<style>
    .left-block .big-menu{width: 13rem;border-right: solid 1px #dcdcdc;}

    .left-block .collapsible-body{padding: 0 !important;}
    .menu-min-cell{line-height: 3rem;padding-left: 5rem;position: relative;cursor: pointer;}
    .left-block .collection-item i{font-size: 1.2rem;color: #b33ef9;}
    .menu-min-cell-active{background: rgba(0,0,0,0.1);border-left: solid 0.2rem #999999;pointer-events: none;}
    .menu-min-cell i{position: absolute;bottom: 1rem;right: 8.5rem;}
    .menu-min-cell-active i{animation: go-to-right 2s;animation-fill-mode: forwards;}
    .close-menu{position: absolute;right: 0.5rem;top: 1.6rem; }
    .left-block .mini-menu{width: 2rem;border-right: solid 1px #dcdcdc;}
    .mini-menu .collection-header,.mini-menu .collapsible-header{padding: 0;width: 2rem;}
    .mini-menu .collection-header{padding: 0.3rem !important;}
    @keyframes go-to-right {
        from{right: 8.5rem;bottom: 1rem;color:#b33ef9; }
        15%{right: 8rem;bottom: 0.1rem;}
        to{right: 0.5rem;bottom: 0.1rem;color: orangered;}
    }
</style>

<template>
    <div class="left-block">
        <ul class="collection with-header big-menu" style="border: none;" v-show="menu_show">
            <li class="collection-header blue lighten-1 white-text" style="position: relative;">
                <h5>
                    <i class="fa fa-list"></i> 菜单列表
                    <i class="fa fa-chevron-left close-menu" @click="toggle_menu"></i>
                </h5>
            </li>
            <li class="collection-item" style="padding: 0;">
                <ul class="collapsible popout" data-collapsible="accordion">
                    <li>
                        <div class="collapsible-header active"><i class="fa fa-globe"></i>监测预报</div>
                        <div class="collapsible-body">
                            <div class="menu-min-cell" @click="change_path('skjc')" :class="{'menu-min-cell-active':now_path==='skjc'}" id="skjc">
                                <i class="fa fa-motorcycle"></i> 实况监测
                            </div>
                            <div class="menu-min-cell" @click="change_path('zhyb')" :class="{'menu-min-cell-active':now_path==='zhyb'}" id="zhyb">
                                <i class="fa fa-motorcycle"></i> 灾害预报
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header"><i class="fa fa-tint"></i>雨量信息</div>
                        <div class="collapsible-body">
                            <div class="menu-min-cell" @click="change_path('ylcx')" :class="{'menu-min-cell-active':now_path==='ylcx'}" id="ylcx">
                                <i class="fa fa-motorcycle"></i> 雨量查询
                            </div>
                            <div class="menu-min-cell" @click="change_path('ylfb')" :class="{'menu-min-cell-active':now_path==='ylfb'}" id="ylfb">
                                <i class="fa fa-motorcycle"></i> 雨量分布
                            </div>
                            <div class="menu-min-cell" @click="change_path('ylbg')" :class="{'menu-min-cell-active':now_path==='ylbg'}" id="ylbg">
                                <i class="fa fa-motorcycle"></i> 雨量表格
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header"><i class="fa fa-map"></i>分布区划</div>
                        <div class="collapsible-body">
                            <div class="menu-min-cell" @click="change_path('rkfb')" :class="{'menu-min-cell-active':now_path==='rkfb'}" id="rkfb">
                                <i class="fa fa-motorcycle"></i> 人口分布
                            </div>
                            <div class="menu-min-cell" @click="change_path('zhqy')" :class="{'menu-min-cell-active':now_path==='zhqy'}" id="zhqy">
                                <i class="fa fa-motorcycle"></i> 灾害区域
                            </div>
                        </div>
                    </li>
                  <li>
                    <div class="collapsible-header"><i class="fa fa-pie-chart fa-spin"></i>实时监测</div>
                    <div class="collapsible-body">
                        <div class="menu-min-cell" @click="change_path('wxyt')" :class="{'menu-min-cell-active':now_path==='wxyt'}" id="wxyt">
                            <i class="fa fa-motorcycle"></i> 卫星云图
                        </div>
                        <div class="menu-min-cell" @click="change_path('ldt')" :class="{'menu-min-cell-active':now_path==='ldt'}" id="ldt">
                            <i class="fa fa-motorcycle"></i> 雷达图
                        </div>
                        <div class="menu-min-cell" @click="change_path('tflj')" :class="{'menu-min-cell-active':now_path==='tflj'}" id="tflj">
                            <i class="fa fa-motorcycle"></i> 台风路径
                        </div>
                    </div>
                  </li>
                  <li>
                    <div class="collapsible-header"><i class="fa fa-fax"></i>信息上报</div>
                    <div class="collapsible-body">
                        <div class="menu-min-cell" @click="change_path('sjsb')" :class="{'menu-min-cell-active':now_path==='sjsb'}" id="sjsb">
                            <i class="fa fa-motorcycle"></i> 事件上报
                        </div>
                    </div>
                  </li>
                  <li>
                    <div class="collapsible-header"><i class="fa fa-book"></i>科普知识</div>
                    <div class="collapsible-body">
                        <div class="menu-min-cell" @click="change_path('qxkp')" :class="{'menu-min-cell-active':now_path==='qxkp'}" id="qxkp">
                            <i class="fa fa-motorcycle"></i> 气象科普
                        </div>
                        <div class="menu-min-cell" @click="change_path('dzzh')" :class="{'menu-min-cell-active':now_path==='dzzh'}" id="dzzh">
                            <i class="fa fa-motorcycle"></i> 地质灾害
                        </div>
                    </div>
                  </li>
                </ul>

            </li>
        </ul>

        <ul class="collection with-header mini-menu" style="border: none;" v-show="!menu_show" @click="toggle_menu">
            <li class="collection-header blue lighten-1 white-text">
                <i class="fa fa-list"></i>
            </li>
            <li class="collection-item" style="padding: 0;">
                <ul class="collapsible" data-collapsible="accordion">
                    <li>
                        <div class="collapsible-header"><i class="fa fa-globe"></i></div>
                    </li>
                    <li>
                        <div class="collapsible-header"><i class="fa fa-tint"></i></div>
                    </li>
                    <li>
                        <div class="collapsible-header"><i class="fa fa-map"></i></div>
                    </li>
                    <li>
                        <div class="collapsible-header"><i class="fa fa-pie-chart fa-spin"></i></div>
                    </li>
                    <li>
                        <div class="collapsible-header"><i class="fa fa-fax"></i></div>
                    </li>
                    <li>
                        <div class="collapsible-header"><i class="fa fa-book"></i></div>
                    </li>
                </ul>

            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {
                now_path:'skjc',
                menu_show:true
            }
        },
        methods:{
          change_path(path){
              this.now_path = path;
              this.$store.commit('change_now_path', {
                  text: path
              })
          },
            toggle_menu(){
                this.menu_show = !this.menu_show;
            }
        },
        mounted(){
            $(document).ready(function(){
                $('.collapsible').collapsible();
            });
        }
    }
</script>
