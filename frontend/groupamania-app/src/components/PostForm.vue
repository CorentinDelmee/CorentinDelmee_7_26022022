<template>
    <div class="post_message_div">
        <div class="post_message_container">
            <form action="" class="post_message_formulaire">
                <i class="fas fa-solid fa-pen"></i>
                <div class="post_input_container">
                    <p class="post_content">
                        Quoi de neuf ?
                        <textarea name="post_content" id="post_content" class="textarea" role="textbox" contenteditable></textarea>
                    </p>

                    <input name = "image" type="file" id="file_input" hidden @change="LabelDisplay">
                    <label v-if="isValueInInput === false" for="file_input">Choisissez une image</label>
                    <label v-if="isValueInInput === true" for="file_input">{{ filename }}</label>
                </div>                

            </form>
            <div class="button_post_message_container">
                <button @click="savePublication">Poster</button>
            </div>
        </div>
    </div>
</template>

<script>


export default {
  name: 'PostForm',
    data: function() {
        return {
            isValueInInput: false,
            filename: [],
        };
    },
  
  methods:{
        savePublication() {
            let profil = JSON.parse(localStorage.getItem("UserLogin")).User;

            /*let post = {
                nom: profil.nom,
                prenom: profil.prenom,
                user_id: profil.id,
                content: document.getElementById("post_content").value,
            }*/

            let formData = new FormData();
            formData.append("nom", profil.nom);
            formData.append("prenom", profil.prenom);
            formData.append("user_id", profil.id);
            formData.append("content", document.getElementById("post_content").value);
            formData.append("image", document.getElementById("file_input").files[0]);

            for (var value of formData.values()) {
                console.log(value);
            }

        
            fetch("http://localhost:3000/api/publications", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + profil.token,
            },
            body: formData
            })
            .then(res => res.json())
            .then(location.reload())
            .catch(err => console.log(err));
        },


    LabelDisplay(){
        let fileInput = document.getElementById("file_input");
        if (fileInput.files) {
            this.isValueInInput = true
            this.filename = fileInput.files[0].name;
        }
        else{
            this.isValueInInput = false
        }
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/components/post_form";
</style>