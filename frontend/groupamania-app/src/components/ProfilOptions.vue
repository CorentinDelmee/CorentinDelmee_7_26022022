<template>
    <div class="profil_options">
        <div class="nom_option">
            <p>{{profil.nom}}</p>
            <svg @click="ModifyNom" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi modify_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-v-040ef000=""><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z" data-v-040ef000=""></path></svg>
        </div>
        <div class="nom_option">
            <p>{{profil.prenom}}</p>
            <svg @click="ModifyPrenom" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi modify_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-v-040ef000=""><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z" data-v-040ef000=""></path></svg>                                
        </div>
        <div class="disconnect_option">
            <p @click="DisconnectProfil">Se déconnecter</p>
        </div>
        <div class="delete_option">
            <p @click="DeleteProfil">Supprimer mon profil</p>
        </div>
    </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: 'ProfilOptions',
  methods: { 

      ModifyNom(){

      },
      ModifyPrenom(){

      },
      DisconnectProfil(){

      },
      DeleteProfil(){
          
      }

  },
  computed: {
      ...mapGetters(["profil"])
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/layout/profil_options"

</style>