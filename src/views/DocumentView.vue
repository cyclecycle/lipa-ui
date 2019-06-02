<template>
  <div v-if="isLoaded()">
    <div v-for="section in document.data.sections">
      <AnnotatedText
        :text="section.text"
        :annotations="getSectionSentenceData(section.name)"
        :spanClasses="annotatedTextSpanClasses"
        :spanEvents="annotatedTextSpanEvents"
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
      sentences: [],
      activeSentenceId: null,
      annotatedTextSpanClasses: ['sentence'],
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
      const isLoaded = this.document !== null
      return isLoaded
    },
    getSectionSentences: function (sectionName) {
      const sentences = this.sentences.filter(sentence => {
        return sentence.data.section == sectionName
      })
      return sentences
    },
    getSectionSentenceData: function (sectionName) {
      const sentences = this.getSectionSentences(sectionName)
      const sentenceData = sentences.map(sentence => {
        const data = {
          ...sentence.data,
          id: sentence.id,
        }
        return data
      })
      return sentenceData
    },
    activateSentence: function (sentenceId) {
      this.activeSentenceId = sentenceId
    },
    roleLabelRoute: function () {
      const route = `/role-label/?sent_id=${this.activeSentenceId}`
      return route
    },
    getSpanClasses: function(span) {
      if (span.annotationIds.length > 0) {
        return ['sentence']
      } else {
        return []
      }
    },
    onSpanClick: function(e) {
      let annotationIds = e.target.attributes['data-annotation-ids'].value
      if (annotationIds !== '') {
        annotationIds = annotationIds.split(',')
        const sentenceId = annotationIds[0]
        this.activateSentence(sentenceId)
      }
    }
  }
}
</script>

<style>
.sentence {
  display: inline-block;
}
.sentence:hover {
  outline: 1px solid black;
}
.sentence-active {
  outline: 2px solid black !important;
}
</style>