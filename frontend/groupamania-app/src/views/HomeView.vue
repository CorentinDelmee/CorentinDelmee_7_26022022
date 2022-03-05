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
            <PostCard/>
          </section>

        <!-- Aside Most liked post card -->

          <aside class="top_like">
            <h2>Post populaires</h2>
            <PopularPost/>
          </aside>

      </div>
    </div>
  </body> 
</template>

<script>
// @ is an alias to /src
import MainNavigation from '../components/MainNavigation.vue'
import PopularPost from '../components/PopularPost.vue'
import PostCard from '../components/PostCard.vue'
import InfoGroupomania from '../components/InfoGroupomania.vue'
import PostForm from '../components/PostForm.vue'

export default {
  name: 'HomeView',
  components: {
    MainNavigation,
    PopularPost,
    PostCard,
    InfoGroupomania,
    PostForm,
  },

  mounted() {
    let externalScript = document.createElement("script")
    externalScript.setAttribute("src", "https://kit.fontawesome.com/5f4715b4d1.js");
    externalScript.setAttribute("crossorigin", "anonymous")
    document.body.appendChild(externalScript);
  }

}

</script>

<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/pages/home";
</style>

