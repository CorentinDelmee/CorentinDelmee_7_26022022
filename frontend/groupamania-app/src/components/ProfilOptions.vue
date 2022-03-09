<template>
    <div class="profil_options">
        <div class="nom_option" id="nom_div">
            <p id="nom_paraf">{{profil.nom}}</p>
            <svg @click="ModifyNom" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic modify_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"></path></svg>
        </div>
        <div class="nom_option" id="prenom_div">
            <p id="prenom_paraf">{{profil.prenom}}</p>
            <svg @click="ModifyPrenom" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic modify_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"></path></svg>
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

import { mapGetters } from "vuex";

export default {
  name: 'ProfilOptions',
  methods: { 

      ModifyNom(){

        let User = JSON.parse(localStorage.getItem("UserLogin")).User;

        let parentDiv = document.getElementById("nom_div");
        let messagePos = document.getElementById("nom_paraf");
        let newTextarea = document.createElement("textarea")

        newTextarea.setAttribute("placeholder", "Rentrez votre nouveau nom")
        newTextarea.textContent = User.nom;
        
        messagePos.remove();
        parentDiv.appendChild(newTextarea);

        newTextarea.classList.add("activeTextarea");
        
        newTextarea.style.width = "100%";
        newTextarea.style.minHeight = "25px";
        newTextarea.style.margin = "16px 0 16px 0"
        newTextarea.style.resize = "none"


        // Display Icon Message "none"

        let Icon = document.querySelectorAll("svg");

        for(let i = 0; i < Icon.length; i++){
            Icon[i].style.display = "none"
        }

        let createdTextarea = document.querySelector("textarea.activeTextarea");
        createdTextarea.addEventListener("keydown", (e) => {
            const keyName = e.key;
            if(keyName === 'Enter'){

                e.preventDefault();

                let user_modify = {
                    nom : createdTextarea.value
                }

                User.nom = user_modify.nom
                let data = {User}
                console.log("Bonjour")
                console.log(User.nom)
                localStorage.setItem("UserLogin", JSON.stringify(data))

                fetch(`http://localhost:3000/api/auth/name/${User.id}`,{
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user_modify})
                    })
                    .then(res => res.json())
                    .then(location.reload())
                    .catch(err => console.log(err));
            }

            if(keyName === 'Escape'){
                location.reload();
            }

        })
        


      },
      ModifyPrenom(){

        let User = JSON.parse(localStorage.getItem("UserLogin")).User;

        let parentDiv = document.getElementById("prenom_div");
        let messagePos = document.getElementById("prenom_paraf");
        let newTextarea = document.createElement("textarea")

        newTextarea.setAttribute("placeholder", "Rentrez votre nouveau prenom")
        newTextarea.textContent = User.prenom;
        
        messagePos.remove();
        parentDiv.appendChild(newTextarea);

        newTextarea.classList.add("activeTextarea");
        
        newTextarea.style.width = "100%";
        newTextarea.style.minHeight = "25px";
        newTextarea.style.margin = "16px 0 16px 0"
        newTextarea.style.resize = "none"


        // Display Icon Message "none"

        let Icon = document.querySelectorAll("svg");

        for(let i = 0; i < Icon.length; i++){
            Icon[i].style.display = "none"
        }

        let createdTextarea = document.querySelector("textarea.activeTextarea");
        createdTextarea.addEventListener("keydown", (e) => {
            const keyName = e.key;
            if(keyName === 'Enter'){

                e.preventDefault();

                let user_modify = {
                    prenom : createdTextarea.value
                }

                User.prenom = user_modify.prenom
                let data = {User}
                console.log("Bonjour")
                console.log(User.prenom)
                localStorage.setItem("UserLogin", JSON.stringify(data))

                fetch(`http://localhost:3000/api/auth/surname/${User.id}`,{
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user_modify})
                    })
                    .then(res => res.json())
                    .then(location.reload())
                    .catch(err => console.log(err));
            }

            if(keyName === 'Escape'){
                location.reload();
            }
        })

      },
      DisconnectProfil(){
        localStorage.removeItem("UserLogin");
        window.location.href = "http://localhost:8080/#/"
      },
      DeleteProfil(){
        let User = JSON.parse(localStorage.getItem("UserLogin")).User;
        
        localStorage.removeItem("UserLogin")

        fetch(`http://localhost:3000/api/auth/${User.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(window.location.href = "http://localhost:8080/#/")
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