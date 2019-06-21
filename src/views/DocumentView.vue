<template>
  <div v-if="isLoaded()">
    <div class="heading">Document ID {{ documentId }}</div>
      <div class="columns">
        <div class="column is-two-thirds">
          <section
            v-for="section in document.sections"
            class="document-section"
          >
            <span
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
            </span>
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
          <b-tooltip
            :active="activeSentenceId === null"
            label="Select a sentence to visualise sentence"
            position="is-left"
            class="pt"
          >
              <b-button
                color="primary"
                :disabled="activeSentenceId === null"
                @click="openSentenceVisModal(activeSentenceId)"
              >
                  Visualise sentence
              </b-button>
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

    <DotVisualisationModal
      v-if="showSentenceVisModal"
      :sentenceId="activeSentenceId"
      @close="showSentenceVisModal = false"
    />

  </div>
</template>

<script>
import AnnotatedText from 'vue-annotated-text'
import database from '../database'
import util from '../util'
import DotVisualisationModal from '../components/DotVisualisationModal.vue'

export default {
  name: 'DocumentView',
  props: {
    documentId: {
      type: Number,
      default: 1,
    }
  },
  components: {
    DotVisualisationModal,
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
      showSentenceVisModal: false,
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
    database.loadByQueryIteratively(loadSentencesQuery, loadOnto, sentencesTargetAttribute)
    database.loadByQueryIteratively(loadMatchesQuery, loadOnto, matchesTargetAttribute)
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
      const annotations = util.matchesToAnnotations(matches)
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
    openSentenceVisModal (sentenceId) {
      this.showSentenceVisModal = true
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
.document-section {
  padding-top: 20px;
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