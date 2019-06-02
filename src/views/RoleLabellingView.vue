<template>
  <div v-if="isLoaded()">
    <div>
      <h2>Create training example</h2>
    </div>
    <div>
      <RoleLabellingComponent
        v-bind:sentence="sentence.sentence_text"
        v-bind:tokens="tokens"
      />
    </div>
    <ui-button
      color="primary"
      v-on:click="loading = !loading">
        Generate pattern
    </ui-button>
    <ui-progress-circular
      color="multi-color"
      v-show="loading"
    />
  </div>
</template>

<script>
import RoleLabellingComponent from '../components/RoleLabellingComponent.vue';
import database from '../database'


export default {
  name: 'RoleLabellingView',
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
