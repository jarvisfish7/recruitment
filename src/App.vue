<template>

  <div id="app">
    <el-container>
      <el-header  style="padding: 0">
        <HeaderGuide v-if="$route.meta.showHeaderGuide"></HeaderGuide>
        <boss-header v-if="$route.meta.showBossHeader"></boss-header>
      </el-header>
      <el-main  style="padding: 0">
        <router-view/>
      </el-main>
      <el-footer  style="padding: 0">
        <Footer v-if="$route.meta.showFooter"></Footer>
      </el-footer>
    </el-container>
<!--    <HeaderGuide v-if="$route.meta.showHeaderGuide"></HeaderGuide>-->
<!--    <boss-header v-if="$route.meta.showBossHeader"></boss-header>-->
<!--    <router-view/>-->
<!--    <Footer v-if="$route.meta.showFooter"></Footer>-->
  </div>
</template>

<script>
import HeaderGuide from './components/HeaderGuide/HeaderGuide'
import Footer from './components/Footer/Footer.vue'
import BossHeader from './components/HeaderGuide/BossHeader.vue'

export default {
  components: {
    HeaderGuide,
    Footer,
    BossHeader,
  }
}

</script>
<style>
</style>
