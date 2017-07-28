<style>
    .level-change button{padding: 0 0.8rem;}
    .level-btn-active{background: #2E5F5A !important;}
</style>

<template>
    <div class="card level-change">
        <div class="card-action blue lighten-1 white-text">
            <i class="fa fa-sort-amount-desc purple-text"></i> 等级切换
        </div>
        <div class="card-content" style="text-align: center;">
            <button class="waves-effect waves-light btn" :class="{'level-btn-active':active_btn==='td'}" @click="selected('td')">特大</button>
            <button class="waves-effect waves-light btn" :class="{'level-btn-active':active_btn==='zd'}" @click="selected('zd')">重大</button>
            <button class="waves-effect waves-light btn" :class="{'level-btn-active':active_btn==='zx'}" @click="selected('zx')">中型</button>
            <div style="height: 0.5rem;"></div>
            <button class="waves-effect waves-light btn" :class="{'level-btn-active':active_btn==='xx'}" @click="selected('xx')">小型</button>
            <button class="waves-effect waves-light btn" :class="{'level-btn-active':active_btn==='sy'}" @click="selected('sy')">所有</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                active_btn:'td'
            }
        },
        methods:{
            selected(level){
                this.active_btn = level;
            }
        }
    }
</script>