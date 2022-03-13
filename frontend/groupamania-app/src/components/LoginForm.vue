<template>
<div>
  <div class="form_Container">
    <form action="">
      <div class="form_settings">
        <input type="text" name="email" id="email" class="input_settings" placeholder="&#xf0e0;  Email">
      </div>
      <div class="form_settings">
        <input type="text" name="password" id="password" class="input_settings" placeholder="&#xf023;  Mot de passe">
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