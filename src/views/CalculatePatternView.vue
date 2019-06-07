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
    <div>
      <p v-for="message in patternAPIMessageLog">
        <strong>{{ message }}</strong>
      </p>
    </div>
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
      patternAPIMessageLog: []
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
      // console.log('pos matches:', this.posMatches)
      // console.log('neg matches:', this.negMatches)
      return isLoaded
    },
    loadPosMatches: function() {
      const posMatchIds = [this.posMatchId]
      database.loadRowsByIds('matches', posMatchIds, this, 'posMatches')
    },
    loadNegMatches: function() {
      const negMatchIds = this.negMatchIds
      database.loadRowsByIds('matches', negMatchIds, this, 'negMatches')
    },
    calculatePattern: function() {
      // Hit API, listen to status.
      this.submitted = true
      // If just pos match, build pattern. else refine
      console.log(patternAPI)
      const buildPatternData = {
        pos_match_id: this.posMatchId
      }
      patternAPI.socket.emit('build_pattern', buildPatternData)
      const patternAPIMessageLog = this.patternAPIMessageLog
      patternAPI.socket.on('message', function (message) {
        patternAPIMessageLog.push(message)
      })
      patternAPI.socket.on('build_pattern_success', function (data) {
        console.log(data)
        // this.patternResults = {patternId: data.pattern_id}
        patternAPI.socket.emit('find_matches', data)
      })
    }
  }
}
</script>