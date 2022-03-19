<template>
<div>
  <div class="form_container">
    <form action="">
      <div class="form_settings label_display">
          <label for="email" class="content_label" id="email_label">Email</label>            
        <input type="text" name="email" id="email" class="input_settings">
      </div>
      <div class="form_settings label_display">
        <label for="password" class="content_label" id="password_label">Mot de passe</label>            
        <input type="password" name="password" id="password" class="input_settings">
        <img @click="Hidepassword" class="mdp_hide" src="../assets/svg/hide_icon.svg" alt="">
      </div>                            
    </form>
  </div>


  <div class="button_container">
    <button @click="SendLoginForm" class="button_settings login_button">Se connecter</button>
  </div>
</div>
</template>

<script>

export default {
  name: 'LoginForm',
  methods: {
    SendLoginForm(){

      //Email Input 

      let emailInput = document.getElementById("email");
      let emailValid = false;
      if(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailInput.value) && emailInput.value.length < 255){
        emailValid = true;
        document.getElementById("email_label").textContent = "Email"
        document.getElementById("email_label").style.color = "black"
      }
      else{
        document.getElementById("email_label").textContent = "Insérer votre email"
        document.getElementById("email_label").style.color = "red"
      }

      let passwordInput = document.getElementById("password");
      let passwordValid = false;
      if(passwordInput.value.length > 7){
        passwordValid = true;
        document.getElementById("password_label").textContent = "Mot de passe"
        document.getElementById("password_label").style.color = "black"
      }
      else{
        document.getElementById("password_label").textContent = "Insérer votre mot de passe"
        document.getElementById("password_label").style.color = "red"
      }


      if(emailValid && passwordValid){
        let user_login = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }

      fetch("http://localhost:3000/api/auth/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user_login)
            })
            .then(res => res.json())
            .then((data) => { 

              if(data.error){ 
                console.error(new Error (data.error));
              }
              else{
                console.log(data);
                localStorage.setItem("UserLogin", JSON.stringify(data)); 
                console.log("Connexion")
                this.$router.push("/home")
              }
            })
            .catch(err => console.error(err));
      }
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
@import "../sass/pages/login";
</style>