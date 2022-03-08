<template>
    <body>
        <div class="main_Container">
            <div class="side_Text">
                    <div class="h1_Container">
                        <h1>Connectez vous</h1>
                    </div>
                    <div class="paraf_Container">
                        <p class="login_paraf">Entrez vos identifiants pour vous connecter à votre compte</p>
                    </div>
                    <div class="logo">
                        <img src="../assets/icon-left-font-monochrome-black.png" alt="" class="icon_logo">
                    </div>

                    <LoginForm/>

            </div>
            <div class="main_Text">
                <div class="section_Container">
                    <h2>S'inscrire</h2>
                    <h2 class="Welcome">Bienvenue chez <span class="Groupomania">Groupomania</span></h2>                    
                    <div class="button_Container">
                        <button @click="GoSignInView" class="button_settings signIn_button">Inscrivez vous</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>

import LoginForm from '../components/LoginForm.vue'

export default {
  name: 'LogIn',
  components: {
      LoginForm
  },
  methods: {
      GoSignInView(){
          window.location.href = "http://localhost:8080/#/"
      }
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
@import "../sass/components/buttons";
@import "../sass/layout/form_signIn";
@import "../sass/pages/login";
</style>
