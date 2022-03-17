<template>
    <div class="comment_form_container">
            <form action="" class="comment_form_formulaire">
                                
                <p class="comment_content">
                    <textarea name="comment_content" :id="post_id + `commentText`" class="textarea" role="textbox" contenteditable placeholder="Votre réponse"></textarea>
                </p>

            </form>
            <div class="button_comment_form_container">
                <button @click="saveComment(post_id)">Commenter</button>
            </div>
        </div>
</template>

<script>

export default {
  name: 'CommentForm',
  props: {
      post_id : {
          type: Number,
          required: true,
      }
  },
  methods: { 
    saveComment(id){

        let profil = JSON.parse(localStorage.getItem("UserLogin")).User;

        let comment = {
              nom: profil.nom,
              prenom: profil.prenom,
              content: document.getElementById(`${id}commentText`).value,
              user_id: profil.id,
              post_id: id,
              user_image: profil.file,
        }



        fetch("http://localhost:3000/api/comments", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + profil.token
            },
            body: JSON.stringify(comment)
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.$store.commit('addComment', data)
                console.log(this.$store.state.allMessage);
                document.getElementById(`${id}commentForm`).style.display = "none"
                document.getElementById(`${id}commentText`).value = ""
            })
            .catch(err => console.log(err));       
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/components/comment_form";
</style>