<template>
<div>
  <div class="form_Container">
    <form action="">
      <div class="form_settings label_display">
          <label for="email" class="content_label">Email</label>            
        <input type="text" name="email" id="email" class="input_settings">
      </div>
      <div class="form_settings label_display">
        <label for="password" class="content_label">Mot de passe</label>            
        <input type="password" name="password" id="password" class="input_settings">
        <svg @click="Hidepassword" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic mdp_hide" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z"></path></svg>
      </div>                            
    </form>
  </div>


  <div class="button_Container">
    <button @click="SendLoginForm" class="button_settings login_button">Se connecter</button>
  </div>
</div>
</template>

<script>

export default {
  name: 'LoginForm',
  methods: {
    SendLoginForm(){
      
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
                console.log(new Error (data.error));
              }
              else{
                console.log(data);
                localStorage.setItem("UserLogin", JSON.stringify(data)); 
                console.log("Connexion")
                window.location.href = "http://localhost:8080/#/home"
              }
            })
            .catch(err => console.log(err));
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