<template>
    <div class="profil_options">

        <div v-if="isModifyingNom === false" class="nom_option" id="nom_div">
            <p id="nom_paraf">{{profil.nom}}</p>
            <img @click="ModifyNom" class="modify_icon" src="../assets/svg/options_icon.svg" alt="">
        </div>
        <div v-if="isModifyingNom === true" class="nom_option" id="nom_div_modifying">
            <textarea v-model="profil.nom" name="" id="textareaNom" class="activeTextarea" placeholder="Rentrez votre nom"></textarea>
            <button @click="sendNewNom">Modifier</button>
        </div>


        <div v-if="isModifyingPrenom === false" class="nom_option" id="prenom_div">
            <p id="prenom_paraf">{{profil.prenom}}</p>
            <img @click="ModifyPrenom" class="modify_icon" src="../assets/svg/options_icon.svg" alt="">
        </div>
        <div v-if="isModifyingPrenom === true" class="nom_option" id="prenom_div_modifying">
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
        
        fetch(`${this.$store.state.apiUrl}/auth/name/${User.id}`,{
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
                    .catch(err => console.error(err));

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
        
        fetch(`${this.$store.state.apiUrl}/auth/surname/${User.id}`,{
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
                    .catch(err => console.error(err));

      },

      DisconnectProfil(){
        localStorage.removeItem("UserLogin");
        this.$router.push("/login")
      },
      DeleteProfil(){
        let profil = JSON.parse(localStorage.getItem("UserLogin")).User;
        
        localStorage.removeItem("UserLogin")

        fetch(`${this.$store.state.apiUrl}/auth/${profil.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + profil.token
            },
            body: JSON.stringify(profil)
        })
        .then(res => res.json())
        .then(this.$router.push("/"))
        .catch(err => console.error(err));
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