<template>
<div>
  <h2>子页面1出现</h2>
  <br>
  <br>
  <button @click="jump()">跳回首页</button>

</div>
</template>

<script>
export default {
  name: 'showchildren',
  methods:{
    jump(){
      this.$router.push('/mainhome');
    }
  }
}
</script>

<style scoped>

</style>
