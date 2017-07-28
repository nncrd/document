<style>
    .kpzs{}
    .kpzs-body{position: absolute;top: 0;left: 0;width: 100%;height: 100%;box-sizing: border-box;padding-top: 4rem;}
    .kpzs-list{margin: 0.5rem;height: 96%;overflow-y: auto;}
    .kpzs-list-cell{height: 3.5rem;border-bottom: solid 1px #dcdcdc;margin-top: 1rem;}
    .kpzs-list-cell-left,.kpzs-list-cell-right{line-height: 3.5rem;text-align: center;color: #B33EF9;}
    .kpzs-list-cell-left{font-size: 2rem;}
    .kpzs-list-cell-middle{}
    .kpzs-article-name,.kpzs-article-time{line-height: 2rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;text-align: center;}
    .kpzs-article-name{box-sizing: border-box;padding-right: 5rem;text-align: left;}
    .kpzs-article-assume{line-height: 1rem;font-size: 0.9rem;color: #666;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}

    .kpzs-detail{width: 100%;background: #fafafa;height: 100%;}
    .kpzs-detail-article-title{text-align: center;font-weight: bold;line-height: 3rem;font-size: 1.2rem;}
    .kpzs-detail-article-date{text-align: center;color: #666;font-size: 1rem;}
    .kpzs-detail-article-assume{position: absolute;top: 0;left: 0;width: 100%;height: 100%;padding: 9rem 0.5rem 0.5rem 0.5rem;box-sizing: border-box;z-index: 7;}
    .kpzs-detail-article-assume-inner{height: 100%;text-indent: 2rem;overflow-y: auto;color: #333333;}
    .kpzs-title span{position: relative;z-index: 8;}
</style>

<template>
    <div class="kpzs middle-box">
        <div class="kpzs-article-list" v-if="!detail">
            <div class="kpzs-title right-title">
                <span v-show="now_path==='qxkp'">{{title_qx}}</span>
                <span v-show="now_path==='dzzh'">{{title_dz}}</span>
            </div>
            <div class="kpzs-body">
                <div class="kpzs-list" v-if="now_path==='qxkp'">
                    <div class="kpzs-list-cell row" v-for="(item,index) in figures_qx" @click="cur_article_fn($event,index)">
                        <div class="col s1 kpzs-list-cell-left">
                            <i class="fa fa-google-wallet"></i>
                        </div>
                        <div class="col s10 kpzs-list-cell-middle">
                            <div class="row">
                                <div class="col s7 kpzs-article-name" >
                                    {{item.title}}
                                </div>
                                <div class="col s5 kpzs-article-time" >{{item.date}}</div>
                                <div class="col s12 kpzs-article-assume">
                                    {{item.assume}}
                                </div>
                            </div>

                        </div>
                        <div class="col s1 kpzs-list-cell-right">
                            <i class="fa fa-chevron-right"></i>
                        </div>
                    </div>
                </div>

                <div class="kpzs-list" v-if="now_path==='dzzh'">
                    <div class="kpzs-list-cell row" v-for="(item,index) in figures_dz" @click="cur_article_fn($event,index)">
                        <div class="col s1 kpzs-list-cell-left">
                            <i class="fa fa-google-wallet"></i>
                        </div>
                        <div class="col s10 kpzs-list-cell-middle">
                            <div class="row">
                                <div class="col s7 kpzs-article-name" >
                                    {{item.title}}
                                </div>
                                <div class="col s5 kpzs-article-time" >{{item.date}}</div>
                                <div class="col s12 kpzs-article-assume">
                                    {{item.assume}}
                                </div>
                            </div>

                        </div>
                        <div class="col s1 kpzs-list-cell-right">
                            <i class="fa fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="kpzs-detail" v-if="detail">
            <div class="kpzs-title right-title">
                <span @click="detail=false">
                    <i class="fa fa-chevron-left"></i> 返回
                </span>
            </div>
            <div class="kpzs-detail-article-title">
                {{cur_article.title}}
            </div>
            <div class="kpzs-detail-article-date">
                {{cur_article.date}}
            </div>
            <div class="kpzs-detail-article-assume">
                <div class="kpzs-detail-article-assume-inner">
                    {{cur_article.assume}}
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'kpzs',
        data () {
            return {
                title_qx:'气象知识文章列表',
                title_dz:'地质灾害文章列表',
                figures_qx:[
                    {title:'降水量、降温幅度、霜冻线等都有啥意思？',assume:'雪：降水量、降雪量、积雪深度……与我有关的几个术语常使人混淆，待我一一解答。',date:'2017-01-08'},
                    {title:'春雷——雷暴家族的“温柔”成员',assume:'“春雷”其实只是一种老百姓的叫法，是指发生在初春时节的雷电天气。在气象学上，并没有“春雷”的定义，我们把所有的雷电现象都叫做雷暴。强雷暴一般会带来短时强降水、瞬时大风、大冰雹和龙卷等极端天气。',date:'2017-01-07'},
                    {title:'降水量、降温幅度、霜冻线等都有啥意思？',assume:'雪：降水量、降雪量、积雪深度……与我有关的几个术语常使人混淆，待我一一解答。',date:'2017-01-06'}
                ],
                figures_dz:[
                    {title:'地质灾害基本知识',assume:'地质灾害是指由于自然因素或者人为活动引发的对人民生命和财产造成危害的地质现象。《地质灾害防治条例》中所指的地质灾害，仅指斜坡岩土体运动灾害和地面变形灾害类型。如山体崩塌、滑坡、泥石流、地面塌陷、地裂缝、地面沉降等灾种。我县最常见的是崩塌、滑坡、泥石流和地面塌陷。',date:'2017-01-08'},
                    {title:'地质灾害应急常识',assume:'地质灾害危害较大的是突发性地质灾害。主要有泥石流、滑坡、崩塌、地面塌陷等。地质灾害具有突发性强和危害性大的特点，但是只要我们增强防范意识，掌握一定的自救和互救措施，积极做好预防工作，就可以有效减轻甚至避免人民伤亡和财产损失。',date:'2017-01-07'},
                ],
                cur_article:{title:'文章详情',assume:'',date:''},
                detail:false
            }
        },
        computed:{
            now_path () {
                return this.$store.state.now_path
            }
        },
        methods:{
            cur_article_fn($event,index){
                console.log(index)
                if(this.now_path==='qxkp'){
                    console.log('qxqx')
                    this.cur_article = this.figures_qx[index];
                }
                else{
                    console.log(1111)
                    this.cur_article = this.figures_dz[index];
                }
                this.detail = true;

            }
        },
        watch:{
            now_path(nv,ov){
                this.detail = false;
            }
        }
    }
</script>