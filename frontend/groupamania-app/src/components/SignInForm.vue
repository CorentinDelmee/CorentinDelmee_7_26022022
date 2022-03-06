<template>
    <div class="form_Container">
      <form action="">
        <div class="identity_Container">
          <div class="identity_form_settings">
              <input type="text" name="nom" id="nom" class="input_settings" placeholder="&#xf406;  Nom">
          </div>
          <div class="identity_form_settings">
              <input type="prénom" name="prénom" id="prénom" class="input_settings" placeholder="&#xf406;  Prénom">
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
</template>

<script>

export default {
  name: 'SignIn',

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/layout/form_signIn";
</style>