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

console.log("")
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


        let comment = {
              nom: "Delmee",
              prenom: "Corentin",
              content: document.getElementById(`${id}commentText`).value,
              user_id: 1,
              post_id: id,
        }



        fetch("http://localhost:3000/api/comments", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment})
            })
            .then(res => res.json())
            .then(location.reload())
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