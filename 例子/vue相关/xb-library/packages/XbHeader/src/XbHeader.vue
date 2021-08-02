<template>
  <div class="header">
    header
  </div>
</template>

<script>
export default {
  name: 'XbHeader',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  line-height: 50px;
  background: #41b883;
  color: #fff;
  width: 100%;
}
</style>
