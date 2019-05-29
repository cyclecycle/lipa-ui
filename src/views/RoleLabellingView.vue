<template>
  <div>
    <div>
      <h2>Create training example</h2>
    </div>
    <div>
      <RoleLabellingComponent
        v-bind:sentence="sentence.text"
        v-bind:tokens="sentence.tokens"
      />
    </div>
  </div>
</template>

<script>
import RoleLabellingComponent from '../components/RoleLabellingComponent.vue';
import document from '../data/example/document';

export default {
  name: 'RoleLabellingView',
  components: {
    RoleLabellingComponent,
  },
  props: {
    sentenceId: Number,
  },
  data() {
    return {
      document,
      sentence: null,
    };
  },
  mounted() {
    this.loadSentence(this.sentenceId)
  },
  methods: {
    loadSentence: function (sentenceId) {
      const filtered = this.document.sentences.filter(sentence => {
        return sentence.id == sentenceId
      })
      const sentence = filtered[0]
      this.sentence = sentence
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
