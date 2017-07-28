<style>
    .single-search input{height: 2rem;margin-bottom: 0;width: 8rem;}
    .single-search button{width: 30px;height: 30px;line-height: 30px;}
    .single-search button i{line-height: 30px;font-size: 1.2rem;}
</style>

<template>
    <div class="card single-search">
        <div class="card-action blue lighten-1 white-text">
            <i class="fa fa-dot-circle-o purple-text"></i> 隐患点查询
        </div>
        <div class="card-content" style="text-align: center;">
            <div class="input-field">
                <input id="last_name" type="text" class="validate single_search_name">
                <label for="last_name"><i class="fa fa-pencil purple-text"></i> 名称</label>
                或者
            </div>
            <div class="input-field">
                <input id="num" type="text" class="validate single_search_num">
                <label for="num"><i class="fa fa-pencil purple-text"></i> 编号</label>
                <button class="btn-floating waves-effect waves-light blue"><i class="fa fa-search"></i></button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {}
        }
    }
</script>