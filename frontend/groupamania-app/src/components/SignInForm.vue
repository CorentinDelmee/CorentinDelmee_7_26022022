<template>
<div>
    <div class="form_container">
      <form action="">
          <input @change="ChangeProfilImage" type="file" id="profil_image_input" hidden>
          <label for="profil_image_input" class="image_input">
            <p id="profil_image_label">Photo de profil</p>
            <img :src="profilImage" alt="">
          </label>
        <div class="identity_container">
          <div class="identity_form_settings label_display">
              <label for="nom" class="content_label" id="nom_label">Nom</label>
              <input type="firstname" name="nom" id="nom" class="input_settings" >
          </div>
          <div class="identity_form_settings label_display">
              <label for="prenom" class="content_label" id="prenom_label">Prénom</label>            
              <input type="lastname" name="prenom" id="prenom" class="input_settings" >
          </div>
        </div>
        <div class="form_settings label_display">
          <label for="email" class="content_label" id="email_label">Email</label>            
          <input type="email" name="email" id="email" class="input_settings" >
        </div>
        <div class="form_settings label_display">
          <label for="password" class="content_label" id="password_label">Mot de passe</label>            
          <input type="password" name="password" id="password" class="input_settings" >
          <img @click="Hidepassword" class="mdp_hide" src="../assets/svg/hide_icon.svg" alt="">
        </div>
      </form>
    </div>
    <div class="button_container">
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

      // firstName Input

      let firstNameInput = document.getElementById("nom");
      let firstNameValid = false;
      if(/^[A-Za-zÀ-ÿ]+$/.test(firstNameInput.value) && firstNameInput.value.length < 100){
          firstNameValid = true;
          document.getElementById("nom_label").textContent = "Nom"
          document.getElementById("nom_label").style.color = "black"
      }
      else{
          document.getElementById("nom_label").textContent = "Insérer votre nom"
          document.getElementById("nom_label").style.color = "red"
      }

      // lastName Input

      let lastNameInput = document.getElementById("prenom");
      let lastNameValid = false;
      if(/^[A-Za-zÀ-ÿ]+$/.test(lastNameInput.value) && lastNameInput.value.length < 100){
            lastNameValid = true;
            document.getElementById("prenom_label").textContent = "Prénom"
            document.getElementById("prenom_label").style.color = "black"
        }
      else{
          document.getElementById("prenom_label").textContent = "Insérer votre prénom"
          document.getElementById("prenom_label").style.color = "red"
      }

      // Email Input

      let emailInput = document.getElementById("email");
      let emailValid = false;
      if(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailInput.value) && emailInput.value.length < 255){
        emailValid = true;
        document.getElementById("email_label").textContent = "Email"
        document.getElementById("email_label").style.color = "black"
      }
      else{
        document.getElementById("email_label").textContent = "Insérer un email"
        document.getElementById("email_label").style.color = "red"
      }

      // Password Input

      let passwordInput = document.getElementById("password");
      let passwordValid = false;
      if(passwordInput.value.length > 7){
        passwordValid = true;
        document.getElementById("password_label").textContent = "Mot de passe"
        document.getElementById("password_label").style.color = "black"
      }
      else{
        document.getElementById("password_label").textContent = "8 caractères minimum"
        document.getElementById("password_label").style.color = "red"
      }

      // File Input

      let fileInput = document.getElementById("profil_image_input");
      let fileValid = false;
      if(fileInput.files[0]){
        fileValid= true;
        document.getElementById("profil_image_label").textContent = "Photo de profil"
        document.getElementById("profil_image_label").style.color = "black"
      }
      else{
        document.getElementById("profil_image_label").textContent = "Veuillez choisir une photo de profil"
        document.getElementById("profil_image_label").style.color = "red"
      }

      if(firstNameValid == true && lastNameValid == true && emailValid == true && passwordValid == true && fileValid == true){

        let formData = new FormData();
        formData.append("nom", firstNameInput.value);
        formData.append("prenom", lastNameInput.value);
        formData.append("email", emailInput.value);
        formData.append("passwordhash", passwordInput.value);
        formData.append("role", "Membre");
        formData.append("image", fileInput.files[0]);

        fetch("http://localhost:3000/api/auth/signup", {
              method: 'POST',
              body: formData
              })
              .then(res => res.json())
              .then((data) => {
                if(data.error){
                  console.error(data.error)
                }
                else{
                  this.$router.push("/login")
                }
              })
              .catch(err => console.error(err));
      }
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