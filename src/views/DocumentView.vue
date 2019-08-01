<template>
  <div v-if="isLoaded()">
    <div class="heading">Document ID: {{ documentId }}</div>
    <div class="columns">
      <div class="column is-two-thirds">
        <section v-for="section in document.sections" class="document-section">
          <span
            v-for="sentence in getSectionSentences(section.name)"
            v-on:click="activateSentence(sentence.id)"
            class="sentence-container"
          >
            <AnnotatedText
              :text="sentence.text"
              :annotations="getSentenceAnnotations(sentence.id)"
              :getSpanClasses="getAnnotatedTextSpanClasses"
              :getAnnotationColor="getAnnotationColor"
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
            <div>ID: {{ activeSentenceId }}</div>
            <div>Text: "{{ activeSentence.text }}"</div>
          </div>
          <b-tooltip
            :active="activeSentenceId === null"
            label="Select a sentence to create a training example"
            position="is-left"
          >
            <router-link :to="createTrainingExampleRoute()">
              <b-button color="primary" :disabled="activeSentenceId === null">
                Create training example
              </b-button>
            </router-link>
          </b-tooltip>
          <b-tooltip
            :active="activeSentenceId === null"
            label="Select a sentence to visualise sentence"
            position="is-left"
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
            <div>Match ID: {{ match.match_id }}</div>
            <div>
              Content:
              <div style="padding-left: 20px">
                {{ match.content }}
              </div>
            </div>
            <div>Pattern ID: {{ match.pattern_id }}</div>
          </section>
        </b-message>
      </div>
    </div>

    <DotVisualisationModal
      v-if="showSentenceVisModal"
      model="sentence"
      :id="activeSentenceId"
      @close="showSentenceVisModal = false"
    />
  </div>
</template>

<script>
import AnnotatedText from 'vue-annotated-text';
import database from '../database';
import util from '../util';
import DotVisualisationModal from '../components/DotVisualisationModal.vue';

export default {
  name: 'DocumentView',
  props: {
    documentId: {
      type: Number,
      default: 1,
    },
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
      labelColors: [
        '#B2DFDB',
        '#E1BEE7',
        '#F8BBD0',
        '#FFCDD2',
        '#B2EBF2',
        '#BBDEFB',
        '#C5CAE9',
        '#FFECB3',
        '#C8E6C9',
        '#FFE0B2',
        '#CFD8DC',
      ],
    };
  },
  computed: {
    activeSentence() {
      if (this.activeSentenceId !== null) {
        const sentence = util.objById(this.sentences, this.activeSentenceId);
        return sentence;
      } else {
        return {};
      }
    },
    activeMatches() {
      const matchIds = this.activeAnnotations.map(
        annotation => annotation.matchId
      );
      console.log(this.activeAnnotations)
      let matches = this.matches.filter(match =>
        matchIds.includes(match.match_id)
      );
      matches = matches.map(match => {
        match.content = util.getSlotsContent(match.slots);
        return match;
      });
      return matches;
    },
    uniqueSlotLabels() {
      let allLabels = [];
      this.matches.forEach(match => {
        const labels = Object.keys(match.slots);
        allLabels = allLabels.concat(labels);
      });
      const uniqueLabels = [...new Set(allLabels)];
      return uniqueLabels;
    },
    label2color() {
      const labels = this.uniqueSlotLabels;
      let colorI = 0;
      let isLastcolor = false;
      const label2color = {};
      labels.forEach(label => {
        const color = this.labelColors[colorI];
        label2color[label] = color;
        isLastcolor = colorI === this.labelColors.length - 1;
        if (isLastcolor) {
          colorI = 0;
        } else {
          colorI = colorI + 1;
        }
      });
      return label2color;
    },
  },
  mounted() {
    const documentId = this.documentId;
    const loadDocumentQuery = `documents/?id=${documentId}`;
    const loadSentencesQuery = `sentences/?document_id=${documentId}`;
    const loadMatchesQuery = `pattern_matches_view/?document_id=${documentId}`;
    database.loadOneByQuery({
      query: loadDocumentQuery,
      targetObj: this,
      targetAttribute: 'document',
    });
    database.loadByQueryIteratively({
      query: loadSentencesQuery,
      targetObj: this,
      targetAttribute: 'sentences',
    });
    database.loadByQueryIteratively({
      query: loadMatchesQuery,
      targetObj: this,
      targetAttribute: 'matches',
    });
  },
  methods: {
    isLoaded: function() {
      const documentLoaded = this.document !== null;
      const sentencesLoaded = this.sentences.length > 0;
      const isLoaded = documentLoaded && sentencesLoaded;
      return isLoaded;
    },
    getSectionSentences: function(sectionName) {
      const sentences = this.sentences.filter(sentence => {
        return sentence.section == sectionName;
      });
      return sentences;
    },
    getSentenceAnnotations: function(sentenceId) {
      const matches = this.matches.filter(match => {
        return match.sentence_id == sentenceId;
      });
      const annotations = util.matchesToAnnotations(matches);
      console.log(annotations)
      return annotations;
    },
    activateSentence: function(sentenceId) {
      this.activeSentenceId = sentenceId;
    },
    createTrainingExampleRoute: function() {
      const route = `/create-training-example/?sent_id=${
        this.activeSentenceId
      }`;
      return route;
    },
    getAnnotatedTextSpanClasses: function(span) {
      if (span.annotationIds.length > 0) {
        return ['annotated-span'];
      } else {
        return [];
      }
    },
    getAnnotationColor: function(annotation) {
      const label = annotation.label;
      const color = this.label2color[label];
      return color;
    },
    matchById: function(matchId) {
      const match = util.objById(this.matches, matchId);
      return match;
    },
    onSpanClick: function(e, annotations) {
      this.activeAnnotations = annotations;
    },
    openSentenceVisModal(sentenceId) {
      this.showSentenceVisModal = true;
    },
  },
};
</script>

<style>
.annotated-span {
  /*outline: 1px solid grey;*/
  /*font-weight: bold;*/
}
.annotated-span:hover {
  outline: 1px solid black !important;
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
  background-color: #fce4ec;
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
