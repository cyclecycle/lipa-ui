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
    <br />
    <section id="pattern-api-message-log">
      <p v-for="message in patternAPIMessageLog">
        <strong>{{ message }}</strong>
      </p>
      <p v-if="findMatchesSuccess">
        <router-link :to="'matches/?pattern_id=' + patternResults.patternId">
          View matches
        </router-link>
      </p>
    </section>
  </div>
</template>

<script>
import database from '../database';
import patternAPI from '../pattern_api';
import MatchTable from '../components/MatchTable.vue';

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
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      posMatches: [],
      negMatches: [],
      featureDict: null,
      submitted: false,
      patternResults: null,
      patternAPIMessageLog: [],
      buildPatternResultsReceived: false,
      findMatchesSuccess: false,
    };
  },
  mounted() {
    this.loadPosMatches();
    this.loadNegMatches();
    this.setPatternAPICallbacks();
  },
  methods: {
    isLoaded() {
      const posMatchesLoaded = this.posMatches.length > 0;
      const negMatchesLoaded =
        this.negMatches.length == this.negMatchIds.length;
      const isLoaded = posMatchesLoaded && negMatchesLoaded;
      return isLoaded;
    },
    loadPosMatches() {
      const posMatchIds = [this.posMatchId];
      const loadOnto = this;
      const targetAttribute = 'posMatches';
      database
        .loadByIds('matches_view', posMatchIds, loadOnto, targetAttribute)
        .then(() => {
          if (this.posMatches[0].feature_dict !== undefined) {
            this.featureDict = this.posMatches[0].feature_dict;
          }
        });
    },
    loadNegMatches() {
      const loadOnto = this;
      const targetAttribute = 'negMatches';
      const negMatchIds = this.negMatchIds;
      database.loadByIds(
        'matches_view',
        negMatchIds,
        loadOnto,
        targetAttribute
      );
    },
    setPatternAPICallbacks() {
      const patternAPIMessageLog = this.patternAPIMessageLog;
      patternAPI.on('message', function(message) {
        patternAPIMessageLog.push(message);
      });
      patternAPI.on('error', function(message) {
        patternAPIMessageLog.push(message);
      });
      const this_ = this; // To provide this context in the socket listner
      patternAPI.on('build_pattern_success', function(data) {
        console.log(this_.buildPatternResultsReceived);
        if (!this_.buildPatternResultsReceived) {
          patternAPIMessageLog.push('Build pattern success');
          console.log('build pattern success', data);
          this_.buildPatternResultsReceived = true;
          this_.patternResults = { patternId: data.pattern_id };
          patternAPI.emit('find_matches', data);
        } else {
          console.log('UI tried to call API again, but already have results');
        }
      });
      patternAPI.on('find_matches_success', function(data) {
        patternAPIMessageLog.push('Find matches success');
        this_.findMatchesSuccess = true
      });
    },
    calculatePattern() {
      // Hit API, listen to status.
      this.submitted = true;
      this.buildPatternResultsReceived = false; // In case still true from a previous call
      // If just pos match, build pattern. else refine
      const buildPatternData = {
        pos_match_id: this.posMatchId,
        feature_dict: this.featureDict,
      };
      console.log(buildPatternData)
      patternAPI.emit('build_pattern', buildPatternData);
    },
  },
};
</script>
