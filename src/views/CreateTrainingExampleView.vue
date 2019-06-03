<template>
  <div v-if="isLoaded()">
    <div class="title">Create training example</div>
    <div>
      <RoleLabellingComponent
        ref="roleLabellingComponent"
        v-bind:sentence="sentence.text"
        v-bind:tokens="tokens"
      />
    </div>
    <b-button
      v-on:click="submitTrainingExample()"
    >
        Generate pattern
    </b-button>
  </div>
</template>

<script>
import router from '../router'
import database from '../database'
import RoleLabellingComponent from '../components/RoleLabellingComponent.vue';


export default {
  name: 'CreateTrainingExampleView',
  components: {
    RoleLabellingComponent,
  },
  props: {
    sentenceId: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      sentence: null,
      tokens: [],
      loading: false,
    };
  },
  mounted() {
    database.loadSentence(this, this.sentenceId)
    database.loadTokens(this, this.sentenceId)
  },
  methods: {
    isLoaded: function() {
      const sentenceLoaded = this.sentence !== null
      const isLoaded = sentenceLoaded
      return isLoaded
    },
    submitTrainingExample: function() {
      // POST training example to database. On success, show message and link to pattern table, and call pattern generation APi with training example ID. Listen, and show status in pattern table through "calculating" and "finding matches", and potentially "error".
      this.loading = !this.loading
      const trainingExample = this.$refs.roleLabellingComponent.slots
      database.postTrainingExample(trainingExample)
        .then(() => {
          this.loading = !this.loading
          router.push({
             path: '/calculate-pattern', query: { pos_example_id: 1 }
          })
        })
    },
  }
};
</script>