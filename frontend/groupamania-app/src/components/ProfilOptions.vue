<template>
    <div class="profil_options">

        <div v-if="isModifyingNom === false" class="nom_option" id="nom_div">
            <p id="nom_paraf">{{profil.nom}}</p>
            <svg @click="ModifyNom" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic modify_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"></path></svg>
        </div>
        <div v-if="isModifyingNom === true" class="nom_option" id="nom_div">
            <textarea v-model="profil.nom" name="" id="textareaNom" class="activeTextarea" placeholder="Rentrez votre nom"></textarea>
            <button @click="sendNewNom">Modifier</button>
        </div>


        <div v-if="isModifyingPrenom === false" class="nom_option" id="prenom_div">
            <p id="prenom_paraf">{{profil.prenom}}</p>
            <svg @click="ModifyPrenom" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic modify_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"></path></svg>
        </div>
        <div v-if="isModifyingPrenom === true" class="nom_option" id="prenom_div">
            <textarea v-model="profil.prenom" name="" id="textareaPrenom" class="activeTextarea" placeholder="Rentrez votre prenom"></textarea>
            <button @click="sendNewPrenom">Modifier</button>
        </div>


        <div class="disconnect_option">
            <p @click="DisconnectProfil">Se déconnecter</p>
        </div>
        <div class="delete_option">
            <p @click="DeleteProfil">Supprimer mon profil</p>
        </div>
    </div>
</template>

<script>
console.log(JSON.parse(localStorage.getItem("UserLogin")))

import { mapGetters } from "vuex";

export default {
  name: 'ProfilOptions',
  data: function() {
        return {
            isModifyingNom: false,
            isModifyingPrenom: false,
        };
    },
  methods: { 

      ModifyNom(){

        this.isModifyingNom = true;

      },

      sendNewNom(){

        let createdTextarea = document.getElementById("textareaNom");
        let User = JSON.parse(localStorage.getItem("UserLogin")).User
        console.log(createdTextarea.value);

        let user_modify = {
                    nom : createdTextarea.value,
                    user_id: User.id
                }

        User.nom = user_modify.nom
                let data = {User}
                console.log(User.nom)
                localStorage.setItem("UserLogin", JSON.stringify(data))
        
        fetch(`http://localhost:3000/api/auth/name/${User.id}`,{
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + User.token
                    },
                    body: JSON.stringify(user_modify)
                    })
                    .then(res => res.json())
                    .then(location.reload())
                    .catch(err => console.log(err));

      },

      ModifyPrenom(){

        this.isModifyingPrenom = true;

      },

      sendNewPrenom(){

        let createdTextarea = document.getElementById("textareaPrenom");
        let User = JSON.parse(localStorage.getItem("UserLogin")).User

        let user_modify = {
                    prenom : createdTextarea.value,
                    user_id: User.id
                }

        User.prenom = user_modify.prenom
                let data = {User}
                console.log(User.prenom)
                localStorage.setItem("UserLogin", JSON.stringify(data))
        
        fetch(`http://localhost:3000/api/auth/surname/${User.id}`,{
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + User.token
                    },
                    body: JSON.stringify(user_modify)
                    })
                    .then(res => res.json())
                    .then(location.reload())
                    .catch(err => console.log(err));

      },

      DisconnectProfil(){
        localStorage.removeItem("UserLogin");
        this.$router.push("/login")
        window.location.href = "http://localhost:8080/#/"
      },
      DeleteProfil(){
        let profil = JSON.parse(localStorage.getItem("UserLogin")).User;
        
        localStorage.removeItem("UserLogin")

        fetch(`http://localhost:3000/api/auth/${profil.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + profil.token
            },
            body: JSON.stringify(profil)
        })
        .then(res => res.json())
        .then(this.$router.push("/auth"))
        .catch(err => console.log(err));
      }

  },
  computed: {
      ...mapGetters(["profil"])
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/layout/profil_options"

</style>