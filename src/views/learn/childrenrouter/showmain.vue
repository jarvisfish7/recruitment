<template>
  <div>
    <h2>父路由</h2>
    <br>
    <router-link to="/learn/show">展示儿子页面1的不带参内容</router-link>
    <br>
    <button @click="logout">logout</button>
    <br>
<!--    传一个name-->
    <router-link :to="{name:'showchildren',params:{id:1}}">展示儿子页面2的带参内容</router-link>
    <br>
    <br>
    <router-link to="/learn/table1">展示第一个表格测试</router-link>
    <br>
    <br>
    <h3>页面内容</h3>
    <br>
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: 'showmain',
  methods:{
    logout(){
      this.$store.dispatch("logout");
    }
  }
}
</script>

<style scoped>

</style>
