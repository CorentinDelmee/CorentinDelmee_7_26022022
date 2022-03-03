<template>
  <body> 
    <div class="main_interface">
      <TestBase/>
      <MainNavgation/>
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
  </body> 
</template>

<script>
// @ is an alias to /src
import TestBase from '../components/TestBase.vue'
import HelloWorld from '../components/HelloWorld.vue'
import MainNavigation from '../components/MainNavigation.vue'

export default {
  name: 'HomeView',
  Components: {
    MainNavigation,
    HelloWorld,
    TestBase
  },
}
</script>

<style scoped lang="scss">
@import "../sass/utils/variables";

@import "../sass/base/base";

@import "../sass/pages/home";
</style>
