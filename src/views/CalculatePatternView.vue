<template>
  <div>
    <div class="title">Calculate Pattern</div>
    <div class="heading">Positive training match</div>
      <b-table
        :data="posMatchTableData"
        :columns="matchTableColumns"
        :loading="!isLoaded()">
      </b-table>
    <div class="heading">Negative training matches</div>
      <b-table
        :data="negMatchTableData"
        :columns="matchTableColumns"
        :loading="!isLoaded()">
      </b-table>
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

export default {
  name: 'calculate-pattern-view',
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
      defaultMatchTableColumns: [
        {
          field: 'id',
          label: 'Match ID',
          numeric: true,
          width: 100,
        },
        {
          field: 'sentence_id',
          label: 'Sentence ID',
          numeric: true,
          width: 140,
        },
      ],
      patternResults: null,
      patternAPIMessageLog: []
    }
  },
  computed: {
    slotLabels: function() {
      const posMatch = this.posMatches[0]
      if (posMatch === undefined) {
        return []
      }
      const slots = posMatch.slots
      const slotLabels = Object.keys(slots)
      return slotLabels
    },
    matchTableColumns: function() {
      const slotLabels = this.slotLabels
      const slotColumns = slotLabels.map(slotLabel => {
        const column = {
          field: slotLabel,
          label: slotLabel,
        }
        return column
      })
      const columns = [
        ...slotColumns,
        ...this.defaultMatchTableColumns,
      ]
      return columns
    },
    posMatchTableData: function() {
      let rows = this.posMatches
      rows = this.textifyMatchTokens(rows)
      return rows
    },
    negMatchTableData: function() {
      let rows = this.negMatches
      rows = this.textifyMatchTokens(rows)
      return rows
    },
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
    textifyMatchTokens: function(matches) {
      const slotLabels = this.slotLabels
      const textifiedMatches = matches.map(match => {
        const textifiedMatch = {...match}
        slotLabels.forEach(label => {
          const tokens = textifiedMatch.slots[label]
          const tokenTexts = tokens.map(token => token.text)
          const joinedTokenTexts = tokenTexts.join(', ')
          textifiedMatch[label] = joinedTokenTexts
        })
        return textifiedMatch
      })
      return textifiedMatches
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
        this.patternResults = {patternId: data.patternId}
      })
    }
  }
}
</script>