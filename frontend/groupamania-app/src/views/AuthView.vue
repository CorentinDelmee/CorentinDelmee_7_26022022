<template>
    <body>
        <div class="main_Container">
            <div class="side_Text">
                <div class="h2_Container">
                    <h2>Déja inscrit ?</h2>
                    <h2 class="Welcome">Bienvenue chez <span class="Groupomania">Groupomania</span></h2>
                </div>
                <div class="paraf_Container">
                    <p class="login_paraf">Entrez vos identifiants pour vous connecter à votre compte</p>
                </div>
                <div class="logo">
                    <img src="../assets/icon-left-font-monochrome-white.png" alt="" class="icon_logo">
                </div>
                <div class="button_Container">
                    <button class="button_settings login_button">Se connecter</button>
                </div>
            </div>
            <div class="main_Text">
                <div class="section_Container">
                    <h1>Créer votre compte</h1>
                    <SignInForm/>
                    <div class="button_Container">
                        <button class="button_settings signIn_button">S'inscrire</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>

import SignInForm from '../components/SignInForm.vue'


export default {
  name: 'AuthView',
  components: {
    SignInForm,
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
@import "../sass/pages/login";
@import "../sass/components/buttons";
</style>
