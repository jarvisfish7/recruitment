<template>
  <div id="app">
    <HeaderGuide v-if="$route.meta.showHeaderGuide"></HeaderGuide>
<!--    <boss-header v-if="$route.meta.showBossHeader"></boss-header>-->
    <router-view/>
    <Footer v-if="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import HeaderGuide from './components/HeaderGuide/HeaderGuide'
import Footer from './components/Footer/Footer.vue'
import BossHeader from './components/HeaderGuide/BossHeader.vue'
export default {
  components:{
    HeaderGuide,
    Footer,
    // BossHeader,
  }
}

</script>
<style>
</style>
