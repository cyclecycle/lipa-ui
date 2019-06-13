<template>
  <div v-if="isLoaded()">
    <div class="heading">Document ID {{ documentId }}</div>
      <div class="columns">
        <div class="column is-two-thirds">
          <section v-for="section in document.sections">
            <div
              v-for="sentence in getSectionSentences(section.name)"
              v-on:click="activateSentence(sentence.id)"
              class="sentence-container"
            >
              <AnnotatedText
                :text="sentence.text"
                :annotations="getSentenceAnnotations(sentence.id)"
                :getSpanClasses="getAnnotatedTextSpanClasses"
                :spanEvents="annotatedTextSpanEvents"
                class="sentence"
              />
            </div>
          </section>
        </div>
        <div class="column">
        <b-message :active="true">
          <div class="heading">Sentence</div>
          <div v-if="activeSentenceId !== null" class="pb">
            <div>
              ID: {{ activeSentenceId }}
            </div>
            <div>
              Text: "{{ activeSentence.text }}"
            </div>
          </div>
          <b-tooltip
            :active="activeSentenceId === null"
            label="Select a sentence to create a training example"
            position="is-left"
            class="pt"
          >
            <router-link :to="createTrainingExampleRoute()">
              <b-button
                color="primary"
                :disabled="activeSentenceId === null"
              >
                  Create training example
              </b-button>
            </router-link>
          </b-tooltip>
        </b-message>
        <b-message :active="true">
          <div class="heading">Pattern match</div>
          <section v-for="match in activeMatches" class="box pt">
            <div>
              Match ID: {{ match.match_id }}
            </div>
            <div>
              Content:
              <div style="padding-left: 20px">
                {{ match.content }}
              </div>
            </div>
            <div>
              Pattern ID: {{ match.pattern_id }}
            </div>
            <div>
              Pattern Name: {{ match.pattern_name }}
            </div>
          </section>
        </b-message>
        </div>
      </div>
  </div>
</template>

<script>
import AnnotatedText from 'vue-annotated-text'
import database from '../database'
import util from '../util'

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
      matches: [],
      activeAnnotations: [],
    }
  },
  computed: {
    activeSentence() {
      if (this.activeSentenceId !== null) {
        const sentence = util.objById(this.sentences, this.activeSentenceId)
        return sentence
      } else {
        return {}
      }
    },
    activeMatches() {
      const matchIds = this.activeAnnotations.map(annotation => annotation.matchId)
      let matches = this.matches.filter(match => matchIds.includes(match.match_id))
      matches = matches.map(match => {
        match.content = util.getSlotsContent(match.slots)
        return match
      }) 
      return matches
    },
  },
  mounted() {
    const documentId = this.documentId
    const loadOnto = this
    const documentTargetAttribute = 'document'
    const sentencesTargetAttribute = 'sentences'
    const matchesTargetAttribute = 'matches'
    const loadDocumentQuery = `documents/?id=${documentId}`
    const loadSentencesQuery = `sentences/?document_id=${documentId}`
    const loadMatchesQuery = `pattern_matches_view/?document_id=${documentId}`
    database.loadOneByQuery(loadDocumentQuery, loadOnto, documentTargetAttribute)
    database.loadByQuery(loadSentencesQuery, loadOnto, sentencesTargetAttribute)
    database.loadByQuery(loadMatchesQuery, loadOnto, matchesTargetAttribute)
    // database.streamGet(loadMatchesQuery)
    //   .then(response => {
    //     console.log(response)
    //   })
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
    getSentenceAnnotations: function(sentenceId) {
      const matches = this.matches.filter(match => {
        return match.sentence_id == sentenceId
      })
      let annotations = []
      matches.forEach(match => {
        const matchId = match.match_id
        const patternId = match.pattern_id
        const slots = match.slots
        const slotLabels = Object.keys(slots)
        slotLabels.forEach(slotLabel => {
          let slotTokens = [...slots[slotLabel]]
          slotTokens = slotTokens.forEach(slotToken => {
            const annotation = slotToken
            annotation.label = slotLabel
            annotation.patternId = patternId
            annotation.matchId = matchId
            const annotationId = `${patternId}-${slotLabel}`
            annotation.id = annotationId
            annotations.push(slotToken)
          })
        })
      })
      return annotations
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
        return ['annotated-span']
      } else {
        return []
      }
    },
    matchById: function(matchId) {
      const match = util.objById(this.matches, matchId)
      return match
    },
    onSpanClick: function(e, annotations) {
      this.activeAnnotations = annotations
    },
  }
}
</script>

<style>
.annotated-span {
  outline: 1px solid black;
}
.annotated-span:hover {
  outline: 2px solid black !important;
  cursor: pointer;
}
.sentence-container {
  display: inline-block;
}
.sentence {
  margin-right: 0.25em;
}
.sentence:hover {
  cursor: pointer;
  background-color: hsl(171, 100%, 90%);
}
.sentence-active {
  outline: 2px solid black !important;
}
.pb {
  padding-bottom: 10px;
}
.pt {
  padding-top: 10px;
}
</style>