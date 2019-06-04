<template>
  <div v-if="isLoaded()">
    <div class="heading">Document ID {{ documentId }}</div>
<!--       <b-tooltip
        v-if="activeSentenceId === null"
        label="Select a sentence to create a training example"
        position="is-right"
      > -->
        <b-button
          color="primary"
          :disabled="activeSentenceId === null"
        >
          <router-link :to="createTrainingExampleRoute()">
            Create training example
          </router-link>
        </b-button>
      <!-- </b-tooltip> -->
    <section v-for="section in document.sections">
      <AnnotatedText
        :text="section.text"
        :annotations="getSectionSentences(section.name)"
        :getSpanClasses="getAnnotatedTextSpanClasses"
        :spanEvents="annotatedTextSpanEvents"
      />
    </section>
  </div>
</template>

<script>
import AnnotatedText from 'vue-annotated-text'
import database from '../database'

export default {
  name: 'DocumentView',
  props: {
    documentId: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      document: null,
      sentences: [],
      activeSentenceId: null,
      annotatedTextSpanEvents: {
        click: this.onSpanClick,
      },
    }
  },
  mounted() {
    database.loadDocument(this, this.documentId)
    database.loadSentences(this, this.documentId)
  },
  methods: {
    isLoaded: function() {
      const documentLoaded = this.document !== null
      const sentencesLoaded = this.sentences.length > 0
      const isLoaded = (documentLoaded && sentencesLoaded)
      return isLoaded
    },
    getSectionSentences: function (sectionName) {
      const sentences = this.sentences.filter(sentence => {
        return sentence.section == sectionName
      })
      return sentences
    },
    activateSentence: function (sentenceId) {
      this.activeSentenceId = sentenceId
    },
    createTrainingExampleRoute: function () {
      const route = `/create-training-example/?sent_id=${this.activeSentenceId}`
      return route
    },
    getAnnotatedTextSpanClasses: function(span) {
      if (span.annotationIds.length > 0) {
        return ['annotated-sentence-span']
      } else {
        return []
      }
    },
    onSpanClick: function(e, annotations) {
      const sentenceId = annotations[0].id
      this.activateSentence(sentenceId)
    },
  }
}
</script>

<style>
.annotated-sentence-span:hover {
  outline: 1px solid black;
}
.annotated-sentence-span-active {
  outline: 2px solid black !important;
}
</style>