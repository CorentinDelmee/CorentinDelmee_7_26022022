<template>

  <body> 

    <div class="main_interface">
      
      <!-- NavBar-->

      <MainNavigation/>

      <div class="container_interface">

        <InfoGroupomania/>

        <!-- Section Message -->

          <section class="section_message">
            <PostForm/>
            <PostCard v-for="Message in allMessage" :key="Message.id" :id="Message.id" :nom="Message.nom" :prenom="Message.prenom" :content="Message.content" :file="Message.file" :user_id="Message.user_id" :user_image="Message.user_image"/>
          </section>

        <!-- Aside Most liked post card -->

          <aside class="top_like">
            
          </aside>

      </div>
    </div>
  </body> 
</template>

<script>
// @ is an alias to /src
import MainNavigation from '../components/MainNavigation.vue'
import PostCard from '../components/PostCard.vue'
import InfoGroupomania from '../components/InfoGroupomania.vue'
import PostForm from '../components/PostForm.vue'

import { mapActions, mapGetters } from "vuex";

export default {
  name: 'HomeView',
  components: {
    MainNavigation,
    PostCard,
    InfoGroupomania,
    PostForm,
  },
  computed: {
      ...mapGetters(["allMessage"])
  },
  methods:{
    ...mapActions(["updateProfil", "fetchAllMessage"]),
  },

  mounted() {
    let externalScript = document.createElement("script")
    externalScript.setAttribute("src", "https://kit.fontawesome.com/5f4715b4d1.js");
    externalScript.setAttribute("crossorigin", "anonymous")
    document.body.appendChild(externalScript);    

  },

  created(){
    this.fetchAllMessage();
    this.updateProfil();
  }

}

</script>

<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/pages/home";
</style>

