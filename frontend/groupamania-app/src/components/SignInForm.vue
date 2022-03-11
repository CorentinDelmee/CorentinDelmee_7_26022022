<template>
<div>
    <div class="form_Container">
      <form action="">
        <div>
          <p>COMMENT</p>
        </div>
        <div class="identity_Container">
          <div class="identity_form_settings">
              <input type="text" name="nom" id="nom" class="input_settings" placeholder="&#xf406;  Nom">
          </div>
          <div class="identity_form_settings">
              <input type="prenom" name="prenom" id="prenom" class="input_settings" placeholder="&#xf406;  Prénom">
          </div>
        </div>
        <div class="form_settings">
          <input type="text" name="email" id="email" class="input_settings" placeholder="&#xf0e0;  Email">
        </div>
        <div class="form_settings">
          <input type="text" name="password" id="password" class="input_settings" placeholder="&#xf023;  Mot de passe">
        </div>
      </form>
    </div>
    <div class="button_Container">
        <button @click="SendSignInForm" class="button_settings signIn_button">S'inscrire</button>
    </div>
</div>
</template>

<script>

export default {
  name: 'SignInForm',
  methods: {
    SendSignInForm(){
      let user = {
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        email: document.getElementById("email").value,
        passwordhash: document.getElementById("password").value,
      }

      fetch("http://localhost:3000/api/auth/signup", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(window.location.href = "http://localhost:8080/#/login")
            .catch(err => console.log(err));

    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/layout/form_signIn";
@import "../sass/components/buttons";
@import "../sass/pages/signin";
</style>