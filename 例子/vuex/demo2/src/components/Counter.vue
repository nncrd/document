<template>
<div id="app">
  <p>count is {{ count }}</p>
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
      'count'
      ]),
    methods:mapActions([
      'increment',
      'decrement'
      ])
  }
</script>