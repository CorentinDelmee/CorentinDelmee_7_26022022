<template>
    <div class="post_message_div">
        <div class="post_message_container">
            <form action="" class="post_message_formulaire">
                <i class="fas fa-solid fa-pen"></i>
                                
                <p class="post_content">
                    Quoi de neuf ?
                    <textarea name="post_content" id="post_content" class="textarea" role="textbox" contenteditable></textarea>
                </p>

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
  methods:{
        savePublication() {
            let post = {
                user_id : 1,
                content : document.getElementById("post_content").value
            }

            console.log(post);
        
            fetch("http://localhost:3000/api/publications", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({post})
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
@import "../sass/components/post_form";
</style>