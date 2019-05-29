<template>
  <div>
    <div v-for="section in document.sectionFields">
      <div
        v-for="sentence in getSectionSentences(section)"
        :class="sentenceClasses(sentence.id)"
        v-on:click="activateSentence(sentence.id)"
      >
        <AnnotatedText
          :text="sentence.text"
          :annotations="sentence.tokens"
        />
      </div>
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
import document from '../data/example/document'

export default {
  name: 'DocumentView',
  data() {
    return {
      document,
      activeSentenceId: null,
    }
  },
  methods: {
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