<template>
<div>
    <div v-for="allMessage in allMessage" :key="allMessage.id" class="unique_message">

        <div class="card_post">
            <div class="content_container">
                <div class="avatar_div">
                    <i class="fas fa-id-card-alt"></i>
                </div>
                <div class="content_div">
                    <h3>Nom Prénom</h3>
                    <p><span role="textbox">{{ allMessage.content }}</span></p>
                </div>
            </div>
            <div class="coeur_post">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M128 220.2a13.6 13.6 0 0 1-9.9-4.1L35 133a58 58 0 0 1 2.2-84.2a56.5 56.5 0 0 1 41.6-14a62.8 62.8 0 0 1 40.3 18.3L128 62l11-11a57.9 57.9 0 0 1 84.1 2.2a56.2 56.2 0 0 1 14.1 41.6a62.8 62.8 0 0 1-18.3 40.3l-81 81a13.6 13.6 0 0 1-9.9 4.1Zm5.6-8.3ZM75 46.7a44 44 0 0 0-29.7 11.1a45.8 45.8 0 0 0-1.8 66.7l83.1 83.1a1.9 1.9 0 0 0 2.8 0l81-81c18.2-18.2 19.9-47.5 3.8-65.3a45.8 45.8 0 0 0-66.7-1.8l-15.3 15.2a6.1 6.1 0 0 1-8.5 0l-13.1-13.1A50.3 50.3 0 0 0 75 46.7Z"></path></svg>
                <p>15</p>
            </div>
        </div>
        <CommentsCard/>
    </div>
</div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import CommentsCard from './CommentsCard.vue'

export default {
  name: 'PostCard',
  components: {
    CommentsCard,
  },
  computed: {
      ...mapGetters(["allMessage"])
  },
  methods: {
      ...mapActions(["fetchAllMessage"])
  },
  created() {
      this.fetchAllMessage();
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/components/post_card";
</style>

