<template>
  <div id="app">
    <v-header></v-header>
    <main>
      <v-left></v-left>
      <v-middle></v-middle>
      <v-right></v-right>
    </main>
  </div>  
</template>

<script>
  import Header from '@/components/header/Header'
  import Left from '@/components/left/Left'
  import Middle from '@/components/middle/Middle'
  import Right from '@/components/right/Right'
export default {
  name: 'app',
  components:{
    'v-header':Header,'v-left':Left,'v-middle':Middle,'v-right':Right
  }
}
</script>

<style>
  main{padding-top: 64px;box-sizing: border-box;display: -webkit-box;display: flex;}
  .clear-both{clear: both;}
  .showMes{position: absolute;top: 0;left: 0;background: rgba(0,0,0,0.1);width: 100%;height: 100%;z-index: 10000;text-align: center;}
  .showMes img{height: 50%;margin-top: 15%;}
  .anchorBL{display: none !important;}
  .infoBox img{width: 1.5rem;}
  .infoTitle{line-height: 2.5rem;background: #4e82f9;padding-left: 0.5rem;color: white;border-radius: 0.5rem 0.5rem 0 0 ;}
  #infoBoxBody{background: white;padding:1rem 0.5rem;border-radius:0 0 0.3rem 0.3rem;border:solid 1px #666666;}
  #infoBoxFooter{text-align: center;}
  #infoBoxFooter img{width: 20px;position: relative;top: -3px;z-index: 1}
  .infoBoxInfo{display:-webkit-box;border-bottom: dashed 1px #666666;padding-bottom: 0.5rem;}
  .infoBoxText{-webkit-box-flex:1;}
  .infoBoxImg{width: 100px;height: 100px;overflow: hidden;cursor: pointer;position: relative;z-index: 10}
  .infoBoxImg img{width: 100%;height: 100%;}  
  .infoBoxText_min{display:-webkit-box;}
  .infoValue{-webkit-box-flex:1;}
  .infoName{width: 5.5rem;}  
</style>
