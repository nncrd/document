<style>
    .date-pick select{height: 2rem;margin-bottom: 0.5rem;}
    .date-pick p{font-size: 0.8rem;color: #999999 !important;}
</style>

<template>
    <div class="card date-pick">
        <div class="card-action blue lighten-1 white-text">
            <slot name="title"></slot>
        </div>
        <div class="card-content">

            <div>
                <p><i class="fa fa-skyatlas purple-text"></i> 选择日期 <i class="fa fa-skyatlas purple-text"></i></p>
                <select class="browser-default date_pick_select_day">
                    <option :value="item.value" v-for="item in thirty_day">{{item.text}}</option>
                </select>
            </div>
            <div>
                <p><i class="fa fa-skyatlas purple-text"></i> 选择时刻 <i class="fa fa-skyatlas purple-text"></i></p>
                <select class="browser-default hour-pick date_pick_select_hour">
                    <option :value="item.value" v-for="item in hours">{{item.text}}</option>
                </select>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                thirty_day:[],
                hours:[]
            }
        },
        methods:{
            get_day_hour(){
              for(var i=0;i<30;i++){
                  var today=new Date();
                  var new_day=new Date(today.getTime()-1000*60*60*24*i);
                  var year = new_day.getFullYear();
                  var month = new_day.getMonth()+1;
                  month = month<10?'0'+month:month;
                  var day = new_day.getDate();
                  day = day<10?'0'+day:day;
                  var full_date = year+'年'+month+'月'+day+'日';
                  var full_date_val = year.toString()+month.toString()+day.toString();
                  var obj_date = {text:full_date,value:full_date_val};
                  this.thirty_day.push(obj_date);
              }
              for(var n=0;n<24;n++){
                  var hour_val=n < 10 ? '0' + n: n;
                  var hour = (n < 10 ? '0' + n: n)+'时';
                  var obj_hour = {text:hour,value:hour_val};
                  this.hours.push(obj_hour);
              }
          },
            rerender_hour(){
                var hour = (new Date().getHours()) < 10 ? '0' + (new Date().getHours()) : (new Date().getHours());
                hour = hour.toString();
                setTimeout(function () {
                    $(".date-pick .hour-pick option[value='"+hour+"']").attr("selected",true);
                },50);

            }
        },
        mounted(){
            this.get_day_hour();
            this.rerender_hour();
        }
    }
</script>
