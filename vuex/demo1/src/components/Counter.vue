<template>
<div id="app">
  <p>count is {{ $store.state.count }}</p>
  <p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </p>
</div>
</template>
<script type="text/javascript">
  import {mapGetters,mapActions} from 'vuex'
  export default{
    computed:mapGetters([
      ]),
    methods:mapActions([
      'increment',
      'decrement'
      ])
  }
</script>