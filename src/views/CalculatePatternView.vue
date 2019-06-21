<template>
  <div>
    <div class="title">Calculate Pattern</div>
    <div class="heading">Positive training match</div>
      <MatchTable
        :matches="posMatches"
        :loading="!isLoaded()"
        :slotLabelsAsColumns="false"
      ></MatchTable>
    <div v-if="negMatches.length > 0">
      <div class="heading">Negative training matches</div>
        <MatchTable
          :matches="negMatches"
          :loading="!isLoaded()"
          :slotLabelsAsColumns="false"
        ></MatchTable>
    </div>
    <b-button
      type="is-primary"
      v-on:click="calculatePattern()"
      :disabled="submitted"
    >
      Submit
    </b-button>
    <section id="pattern-api-message-log">
      <p v-for="message in patternAPIMessageLog">
        <strong>{{ message }}</strong>
      </p>
    </section>
  </div>
</template>

<script>
import database from '../database';
import patternAPI from '../pattern_api';
import MatchTable from '../components/MatchTable.vue'

export default {
  name: 'calculate-pattern-view',
  components: {
    MatchTable,
  },
  props: {
    posMatchId: {
      type: Number,
      default: 1,
    },
    negMatchIds: {
      type: Array,
      default: function() { return [] },
    },
  },
  data() {
    return {
      posMatches: [],
      negMatches: [],
      loading: true,
      submitted: false,
      patternResults: null,
      patternAPIMessageLog: [],
      buildPatternResultsReceived: false,
    }
  },
  mounted() {
    this.loadPosMatches()
    this.loadNegMatches()
  },
  methods: {
    isLoaded: function() {
      const posMatchesLoaded = this.posMatches.length > 0
      const negMatchesLoaded = this.negMatches.length == this.negMatchIds.length
      const isLoaded = posMatchesLoaded && negMatchesLoaded
      return isLoaded
    },
    loadPosMatches: function() {
      const posMatchIds = [this.posMatchId]
      const loadOnto = this
      const targetAttribute = 'posMatches'
      database.loadByIds('matches_view', posMatchIds, loadOnto, targetAttribute)
    },
    loadNegMatches: function() {
      const loadOnto = this
      const targetAttribute = 'negMatches'
      const negMatchIds = this.negMatchIds
      database.loadByIds('matches_view', negMatchIds, loadOnto, targetAttribute)
    },
    calculatePattern: function() {
      // Hit API, listen to status.
      this.submitted = true
      // If just pos match, build pattern. else refine
      const buildPatternData = {
        pos_match_id: this.posMatchId
      }
      patternAPI.socket.emit('build_pattern', buildPatternData)
      const patternAPIMessageLog = this.patternAPIMessageLog
      patternAPI.socket.on('message', function (message) {
        patternAPIMessageLog.push(message)
      })
      patternAPI.socket.on('error', function (message) {
        patternAPIMessageLog.push(message)
      })
      patternAPI.socket.on('build_pattern_success', function (data) {
        if (!this.buildPatternResultsReceived) {
          patternAPIMessageLog.push('Build pattern success')
          console.log('build pattern success', data)
          this.buildPatternResultsReceived = true
          this.patternResults = {patternId: data.pattern_id}
          patternAPI.socket.emit('find_matches', data)
        } else {
          console.log('UI tried to call API again, but already have results')
        }
      })
      patternAPI.socket.on('find_matches_success', function (data) {
        patternAPIMessageLog.push('Find matches success')
      })
    }
  }
}
</script>