<style>
    .tuceng{position: absolute;top: 3rem;right: 0;text-align: right;}
    .tuceng-box{background: #fafafa;width: 9rem;box-shadow: 0 0.1rem 0.3rem rgba(0,0,0,0.6);border-radius: 0.3rem 0.3rem 0 0;margin-top: 0.5rem;}
    .tuceng-cell{line-height: 1.5rem;font-size: 1rem;color: #777777;cursor: pointer;text-align: left;padding: 0.5rem;}
    .tuceng-cell-active{color: #b33ef9;}
    .tuceng-cell img{height: 1rem;margin: 0 0.2rem -0.2rem 0;}
    .tuceng-cell label{display: block;}
    .tuceng button{margin-right: 10px;}
</style>

<template>
    <div class="tuceng">
        <button class="btn-floating btn-large waves-effect waves-light red" @click="show=!show">图层</button>
        <div class="tuceng-box" v-show="show">
            <div class="tuceng-cell" v-for="(item,index) in tucengs">
                <input type="checkbox" class="filled-in" :id="item.id" :value="item.value+'/'+index" v-model="tuceng_selected" @change="check"/>
                <label :for="item.id"><img :src="item.src" /> {{item.name}} </label>
            </div>
            <div class="clear-both"></div>
        </div>



    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                show:false,
                tucengs:[
                    {name:'坍塌',value:'tc_坍塌',src:'http://ogbcvxavq.bkt.clouddn.com/pwebcollapsed.png?imageslim',id:'tuceng-tanta'},
                    {name:'斜坡变形',value:'tc_斜坡变形',src:'http://ogbcvxavq.bkt.clouddn.com/pwebunstableSlope1.png?imageslim',id:'tuceng-xiepobianxing'},
                    {name:'滑坡',value:'tc_滑坡',src:'http://ogbcvxavq.bkt.clouddn.com/pweblandslide.png?imageslim',id:'tuceng-huapo'},
                    {name:'泥石流',value:'tc_泥石流',src:'http://ogbcvxavq.bkt.clouddn.com/pwebmudSlides.png?imageslim',id:'tuceng-nishiliu'}
                ],
                tuceng_selected:[]
            }
        },
        methods:{
            check(){
                this.$store.commit('CHANGE_TUCENG', {
                    text: this.tuceng_selected
                })
            }
        }
    }
</script>