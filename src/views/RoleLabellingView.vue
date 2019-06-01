<template>
  <div>
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
    this.loadSentence(this.sentenceId)
    this.loadTokens(this.sentenceId)
  },
  methods: {
    loadSentence: function (sentenceId) {
      const query = `sentences/?id=${sentenceId}`
      database.get(query)
        .then(items => {
          this.sentence = items[0]
          console.log(sentence.sentence_text)
        })
        .catch(e => {
        })
    },
    loadTokens: function (sentenceId) {
      const query = `tokens/?sentence_id=${sentenceId}`
      database.get(query)
        .then(items => {
          let tokens = items
          tokens = tokens.map(token => {
            const data = {
              ...token.data,
              id: token.id
            }
            return data
          })
          this.tokens = tokens
          console.log(tokens)
        })
        .catch(e => {
        })
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
