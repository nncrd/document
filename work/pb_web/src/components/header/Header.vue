<style>
    header{width: 100%;position: absolute;}

    .brand-logo{padding-left: 1rem !important;font-weight: bold;text-shadow: 0.1rem 0.1rem 0.3rem rgba(0,0,0,0.8);}
    .brand-logo i{color: #00DAFF;}

    .backstage{margin-right: 1rem;position: relative;}
    .backstage span{position: absolute;top: 0.2rem ;right: 0.2rem;background: red;padding:0.1rem 0.2rem;line-height: 1rem;border-radius: 0.5rem;min-width: 1.5rem;}
</style>

<template>
    <header>
        <nav class="blue darken-2">
            <div class="nav-wrapper">
                <a class="brand-logo">
                    <i class="fa fa-skyatlas"></i> 浦北县地质灾害气象条件监测预警系统
                </a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><button class="waves-effect waves-light teal lighten-1 btn backstage" @click="backstage">后台管理<span>{{pre_do}}</span></button></li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>

    export default {
        name: '',
        data () {
            return {
                pre_do:''
            }
        },
        methods:{
            get_pre_do:function () {

                this.$http.get(urlHead+'disaster-report-findCount',{
                    before:function () {
                    }
                }).then(function (data) {
                    this.pre_do = data.body.recordsTotal;
                }, function (err) {
                    console.log(err.message)
                });
            },
            backstage(){
                window.location = urlHead+'html/index.html'
            }
        },
        mounted:function () {
            this.get_pre_do();
        }
    }
</script>