<template>
  <div>
    <div v-for="section in document.data.sections">
      <AnnotatedText
        :text="section.text"
        :annotations="[]"
      />
    </div>
    <router-link :to="roleLabelRoute()">
      <ui-button color="primary">
        Create training example
      </ui-button>
    </router-link>
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
      activeSentenceId: null,
    }
  },
  mounted() {
    this.loadDocument(this.documentId)
  },
  methods: {
    loadDocument: function (documentId) {
      database.get('documents/?id=1')
        .then(items => {
          this.document = items[0]
          console.log(items[0])
        })
        .catch(e => {
          console.log(e)
        })
    },
    getSectionSentences: function (section) {
      const sentences = this.document.sentences.filter(sentence => {
        return sentence.section == section
      })
      return sentences
    },
    activateSentence: function (sentenceId) {
      this.activeSentenceId = sentenceId
    },
    sentenceClasses: function (sentenceId) {
      const sentenceClasses = ['sentence']
      if (sentenceId === this.activeSentenceId) {
        sentenceClasses.push('sentence-active')
      } else {
        sentenceClasses.push('sentence-inactive')
      }
      return sentenceClasses
    },
    getActiveSentence: function () {
      const filtered = this.document.sentences.filtered(sentence => {
        return sentence.id === this.activeSentenceId
      })
      const sentence = filtered[0]
      return sentence
    },
    roleLabelRoute: function () {
      const route = `/role-label/?sent_id=${this.activeSentenceId}`
      return route
    }
  }
}
</script>

<style>
.sentence {
  display: inline-block;
}
.sentence-inactive:hover {
  outline: 1px solid black;
}
.sentence-active {
  outline: 2px solid black;
}
</style>