<template>
    <body>
        <div class="main_container">
            <div class="side_text">
                    <div class="h1_container">
                        <h1>Connectez vous</h1>
                    </div>
                    <div class="paraf_container">
                        <p class="login_paraf">Entrez vos identifiants pour vous connecter à votre compte !</p>
                    </div>
                    <div class="logo">
                        <img src="../assets/icon-left-font-monochrome-black.png" alt="" class="icon_logo">
                    </div>

                    <LoginForm/>
                    <div class="signIn_button_div">
                        <router-link to="/">
                            <button class="button_settings signIn_button">Inscrivez vous !</button>
                        </router-link>
                    </div>

            </div>
            <div class="main_text">
                <div class="section_container">
                    <h2>S'inscrire</h2>
                    <h2 class="Welcome">Bienvenue chez <span class="Groupomania">Groupomania</span></h2>                    
                    <div class="button_container">
                        <router-link to="/">
                            <button class="button_settings signIn_button">Inscrivez vous !</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>

if(localStorage.getItem("UserLogin")){
    window.location.href = "http://localhost:8080/#/home";
}

import LoginForm from '../components/LoginForm.vue'

export default {
  name: 'LogIn',
  components: {
      LoginForm
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
