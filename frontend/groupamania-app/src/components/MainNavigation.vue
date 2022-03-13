<template>
  <nav>
                    <div class="logo_div">
                        
                    </div>
                    <div class="main_nav_container">
                        <div class="home_container">
                            <img src="../assets/icon-left-font-monochrome-black.png" alt="" class="logo">
                        </div>
                    </div>
                    <div class="profil_div">
                        <img @click="ProfilOptionsDisplay" :src="profil.file" alt="" class="profil_image">
                        <p>{{profil.prenom + " " + profil.nom}}</p>
                        <ProfilOptions id="ProfilOptions"/>
                    </div>
                </nav>
</template>

<script>

import ProfilOptions from './ProfilOptions.vue';
import { mapGetters } from "vuex";


export default {
  name: 'MainNavigation',
  components: {
      ProfilOptions,
  },
  computed: {
      ...mapGetters(["profil"])
  },
  methods: {
      ProfilOptionsDisplay(){

        let ProfilOptions = document.getElementById(`ProfilOptions`);

        if(ProfilOptions.style.display === "none" || ProfilOptions.style.display === ""){
            ProfilOptions.style.display = "flex";
        }
        else{
            ProfilOptions.style.display = "none"
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/layout/nav";
</style>
