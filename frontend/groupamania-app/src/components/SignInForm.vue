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
          <input type="password" name="password" id="password" class="input_settings" >
          <svg @click="Hidepassword" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic mdp_hide" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z"></path></svg>
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
    },

    Hidepassword(){
      let password_Input = document.getElementById("password");
      if (password_Input.type == "password"){
        password_Input.setAttribute("type", "text")
      }
      else{
        password_Input.setAttribute("type", "password")
      }
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