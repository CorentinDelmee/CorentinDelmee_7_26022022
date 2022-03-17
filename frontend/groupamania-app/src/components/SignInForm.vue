<template>
<div>
    <div class="form_Container">
      <form action="">
          <input @change="ChangeProfilImage" type="file" id="profil_image_input" hidden>
          <label for="profil_image_input" class="image_input">
            <p>Photo de profil</p>
            <img :src="profilImage" alt="">
          </label>
        <div class="identity_Container">
          <div class="identity_form_settings label_display">
              <label for="nom" class="content_label">Nom</label>
              <input type="text" name="nom" id="nom" class="input_settings" >
          </div>
          <div class="identity_form_settings label_display">
              <label for="prenom" class="content_label">Prénom</label>            
              <input type="prenom" name="prenom" id="prenom" class="input_settings" >
          </div>
        </div>
        <div class="form_settings label_display">
          <label for="email" class="content_label">Email</label>            
          <input type="text" name="email" id="email" class="input_settings" >
        </div>
        <div class="form_settings label_display">
          <label for="password" class="content_label">Mot de passe</label>            
          <input type="text" name="password" id="password" class="input_settings" >
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
  data: function() {
        return {
            profilImage: "http://localhost:3000/images/profil_photo_default.png",
        };
    },
  methods: {
    SendSignInForm(){

      let formData = new FormData();
      formData.append("nom", document.getElementById("nom").value);
      formData.append("prenom", document.getElementById("prenom").value);
      formData.append("email", document.getElementById("email").value);
      formData.append("passwordhash", document.getElementById("password").value);
      formData.append("role", "Membre");
      formData.append("image", document.getElementById("profil_image_input").files[0]);

      fetch("http://localhost:3000/api/auth/signup", {
            method: 'POST',
            body: formData
            })
            .then(res => res.json())
            .then(window.location.href = "http://localhost:8080/#/login")
            .catch(err => console.log(err));

    },

    ChangeProfilImage(){
      let profil_image_input = document.getElementById("profil_image_input");
      this.profilImage = URL.createObjectURL(profil_image_input.files[0]);
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