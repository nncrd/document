<style>
    .kpzs{}
    .kpzs-body{position: absolute;top: 0;left: 0;width: 100%;height: 100%;box-sizing: border-box;padding-top: 4rem;}
    .kpzs-list{margin: 0.5rem;height: 96%;overflow-y: auto;}
    .kpzs-list-cell{height: 3.5rem;border-bottom: solid 1px #dcdcdc;margin-top: 1rem;}
    .kpzs-list-cell-left,.kpzs-list-cell-right{line-height: 3.5rem;text-align: center;color: #B33EF9;}
    .kpzs-list-cell-left{font-size: 2rem;}
    .kpzs-list-cell-middle{cursor: pointer;}
    .kpzs-article-name,.kpzs-article-time{line-height: 2rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;text-align: center;}
    .kpzs-article-name{box-sizing: border-box;padding-right: 5rem;text-align: left;}
    .kpzs-article-assume{line-height: 1rem;font-size: 0.9rem;color: #666;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}

    .kpzs-detail{width: 100%;background: #fafafa;height: 100%;}
    .kpzs-detail-article-title{text-align: center;font-weight: bold;line-height: 3rem;font-size: 1.2rem;}
    .kpzs-detail-article-date{text-align: center;color: #666;font-size: 1rem;}
    .kpzs-detail-article-assume{position: absolute;top: 0;left: 0;width: 100%;height: 100%;padding: 9rem 0.5rem 0.5rem 0.5rem;box-sizing: border-box;z-index: 7;}
    .kpzs-detail-article-assume-inner{height: 100%;text-indent: 2rem;overflow-y: auto;color: #333333;}
    .kpzs-title span{position: relative;z-index: 8;cursor: pointer;}
    #detailContent{width:100%;height:95%;max-height: 95%;overflow: auto;padding:0 1em}
    .pagination i{cursor: pointer;}
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
                    <div class="kpzs-list-cell row" v-for="(item,index) in figures_qx" @click="cur_article_fn($event,index,item)">
                        <div class="col s1 kpzs-list-cell-left">
                            <i class="fa fa-google-wallet"></i>                            
                        </div>                        
                        <div class="col s10 kpzs-list-cell-middle">
                            <div class="row">
                                <div class="col s7 kpzs-article-name" >
                                    {{item.title}}
                                </div>
                                <div class="col s5 kpzs-article-time" >{{item.createTime}}</div>
                                <div class="col s12 kpzs-article-assume">
                                    {{item.contentAbstract}}
                                </div>
                            </div>

                        </div>
                        <div class="col s1 kpzs-list-cell-right">
                            <i class="fa fa-chevron-right"></i>
                        </div>
                    </div>
                    <ul class="pagination">
                      <p v-show="!figures_qx">目前无数据！</p>
                      <i class="material-icons" v-show="figures_qx" @click='lastPage($event,1)'>chevron_left</i></a></li>                      
                      <li v-for="item in figuresPages" :class="{'active': item == currentPages}" @click='changePage($event,1)'><a href="#">{{item}}</a></li>
                      <i class="material-icons" v-show="figures_qx" @click='nextPage($event,1)'>chevron_right</i></a></li>
                    </ul>
                </div>

                <div class="kpzs-list" v-if="now_path==='dzzh'">
                    <div class="kpzs-list-cell row" v-for="(item,index) in figures_dz" @click="cur_article_fn($event,index,item)">
                        <div class="col s1 kpzs-list-cell-left">
                            <i class="fa fa-google-wallet"></i>                            
                        </div>
                        <div class="col s10 kpzs-list-cell-middle">
                            <div class="row">
                                <div class="col s7 kpzs-article-name" >
                                    {{item.title}}
                                </div>
                                <div class="col s5 kpzs-article-time" >{{item.createTime}}</div>
                                <div class="col s12 kpzs-article-assume">
                                    {{item.contentAbstract}}
                                </div>
                            </div>

                        </div>
                        <div class="col s1 kpzs-list-cell-right">
                            <i class="fa fa-chevron-right"></i>
                        </div>
                    </div>
                    <ul class="pagination">
                      <p v-show="!figures_qx">目前无数据！</p>
                      <i class="material-icons" v-show="figures_dz" @click='lastPage($event,2)'>chevron_left</i></a></li>
                      <li v-for="item in figures_dzPages" :class="{'active': item == current_dzPages}" @click='changePage($event,2)'><a href="#">{{item}}</a></li>
                      <i class="material-icons" v-show="figures_dz" @click='nextPage($event,2)'>chevron_right</i></a></li>
                    </ul>
                </div>
            </div>
        </div>


        <div class="kpzs-detail" v-show="detail">
            <div class="kpzs-title right-title">
                <span @click="detail=false" >
                    <i class="fa fa-chevron-left"></i> 返回
                </span>
            </div>
            <!--<div class="kpzs-detail-article-title">
                {{cur_article.title}}
            </div>
            <div class="kpzs-detail-article-date">
                {{cur_article.date}}
            </div>
            <div class="kpzs-detail-article-assume">
                <div class="kpzs-detail-article-assume-inner">
                    {{cur_article.assume}}
                </div>
            </div>-->
            <div id="detailContent">页面加载中...
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
                figuresPages:0,
                currentPages:1,
                figures_dzPages:0,
                current_dzPages:1,
                figures_qx:'',
                figures_dz:'',
                cur_article:{title:'文章详情',assume:'',date:''},
                detail:false
            }
        },
        mounted(){
          var _this=this
          $.ajax({ type:"GET",
            url:urlHead+"knowledge-share-list",
            timeout : 30000,
            data:{'type':1,'status':1},
            dataType:"json",
            success:function(data){
              console.log(data.data)
              if(data.data.length)
              {
                _this.figuresPages = Math.ceil(data.recordsTotal/10);
                _this.figures_qx = data.data;
              }
            },
            error:function() {
                console.log("error");
            },
            beforeSend:function(){
                
            },
            complete:function(){
                
            }
          });
          $.ajax({ type:"GET",
            url:urlHead+"knowledge-share-list",
            timeout : 30000,
            data:{'type':2,'status':1},
            dataType:"json",
            success:function(data){
              console.log(data.data)
              if(data.data.length)
              {
                _this.figures_dzPages = Math.ceil(data.recordsTotal/10);
                _this.figures_dz = data.data;
              }
            },
            error:function() {
                console.log("error");
            },
            beforeSend:function(){
                
            },
            complete:function(){
                
            }
          })
        },
        computed:{
            now_path () {
                return this.$store.state.now_path
            }
        },
        methods:{
            cur_article_fn($event,index,item){
              this.detail = true;     
              $('#detailContent').html('')
              console.log(this.now_path+'----------')
              
              if(this.now_path==='qxkp'){
                  this.cur_article = this.figures_qx[index]; 
                  $('#detailContent').load(item.htmlUrl);
              }
              else{
                  this.cur_article = this.figures_dz[index];
                  $('#detailContent').load(item.htmlUrl);
              }
              console.log(this.now_path+'++++++++++')
              
            },
            changePage(e,type){
              console.log(e.target.innerHTML)
              if(type==1)
              {
                this.currentPages=e.target.innerHTML
                this.refreshData(this.currentPages,type)
              }
              else if(type==2)
              {
                this.current_dzPages=e.target.innerHTML
                this.refreshData(this.current_dzPages,type)
              }              
            },      
            lastPage(e,type){
              if(type==1)
              {
                if(this.currentPages!=1)
                {
                  this.currentPages=parseInt(this.currentPages)-1
                  this.refreshData(this.currentPages,type)
                }
              }
              else if(type==2)
              {
                if(this.current_dzPages!=1)
                {
                  this.current_dzPages=parseInt(this.current_dzPages)-1
                  this.refreshData(this.current_dzPages,type)
                }
              }              
            },
            nextPage(e,type){
              if(type==1)
              {
                if(this.currentPages!=this.figuresPages)
                {
                  this.currentPages=parseInt(this.currentPages)+1
                  this.refreshData(this.currentPages,type)
                }
              }
              else if(type==2)
              {
                if(this.current_dzPages!=this.figures_dzPages)
                {
                  this.current_dzPages=parseInt(this.current_dzPages)+1
                  this.refreshData(this.current_dzPages,type)
                }
              }              
            },
            refreshData(page,type){
              var _this=this
              $.ajax({ type:"GET",
                url:urlHead+"knowledge-share-list",
                timeout : 30000,
                data:{"iDisplayStart":(page-1)*10,'type':type,'status':1},
                dataType:"json",
                success:function(data){
                  if(type==1){                   
                    _this.figuresPages = Math.ceil(data.recordsTotal/10);
                    _this.figures_qx = data.data;
                  }
                  if(type==2){                   
                    _this.figures_dzPages = Math.ceil(data.recordsTotal/10);
                    _this.figures_dz = data.data;
                  }
                },
                error:function() {
                    console.log("error");
                },
                beforeSend:function(){
                    
                },
                complete:function(){
                    
                }
              })
            }
        },
        watch:{
            now_path(nv,ov){
                this.detail = false;
            }
        }
    }
</script>