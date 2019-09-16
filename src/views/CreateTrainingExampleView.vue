<template>
  <div v-if="isLoaded()">
    <div class="title">Create Pattern</div>
    <div>
      <RoleLabellingComponent
        ref="roleLabellingComponent"
        :sentence="sentence.text"
        :tokens="tokens"
        :slotLabels="activeTemplateMatchSlotLabels"
      />
    </div>

    <div id="features">
      <b-field
        label="Token features"
        :type="featureDictIsValidJSON ? 'is-success' : 'is-danger'"
        :message="featureDictIsValidJSON ? 'Valid JSON' : 'Invalid JSON'"
      >
        <b-input v-model="featureDictInputValue" type="textarea" />
      </b-field>
    </div>

    <div id="templates">
      <label class="label">Load template</label>
      <div class="buttons">
        <b-button
          v-for="match in trainingMatchesHistory"
          @click="
            () => {
              activeTemplateMatch = match;
            }
          "
        >
          {{ matchSlotRepr(match) }}
        </b-button>
      </div>
    </div>

    <b-button
      v-on:click="submitTrainingMatch()"
      type="is-primary"
      style="margin-top: 30px"
    >
      Generate pattern
    </b-button>
  </div>
</template>

<script>
import router from '../router';
import database from '../database';
import RoleLabellingComponent from '../components/RoleLabellingComponent.vue';

export default {
  name: 'CreateTrainingExampleView',
  components: {
    RoleLabellingComponent,
  },
  props: {
    sentenceId: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      sentence: null,
      tokens: [],
      loading: false,
      featureDict: { DEP: 'dep_', TAG: 'tag_' },
      featureDictInputValue: '',
      featureDictIsValidJSON: true,
      trainingMatchesHistory: [],
      activeTemplateMatch: null,
    };
  },
  watch: {
    featureDictInputValue() {
      try {
        this.featureDict = JSON.parse(this.featureDictInputValue);
        this.featureDictIsValidJSON = true;
      } catch {
        this.featureDictIsValidJSON = false;
      }
    },
    activeTemplateMatch() {
      if (
        this.activeTemplateMatch != null &&
        this.activeTemplateMatch.feature_dict !== undefined
      ) {
        this.featureDictInputValue = JSON.stringify(
          this.activeTemplateMatch.feature_dict,
          null,
          2
        );
      }
    },
  },
  computed: {
    activeTemplateMatchSlotLabels() {
      const activeTemplateMatch = this.activeTemplateMatch;
      if (activeTemplateMatch !== null) {
        const slotLabels = Object.keys(this.activeTemplateMatch.slots);
        return slotLabels;
      } else {
        return null;
      }
    },
    activeTemplateMatchFeatureDict() {
      const featureDict = this.activeTemplateMatch.feature_dict;
      if (featureDict !== undefined) {
        console.log(featureDict);
      }
    },
  },
  mounted() {
    const sentenceId = this.sentenceId;
    const sentenceTargetAttribute = 'sentence';
    const tokensTargetAttribute = 'tokens';
    const sentenceQuery = `sentences/?id=${sentenceId}`;
    const tokensQuery = `tokens/?sentence_id=${sentenceId}`;
    database.loadOneByQuery({
      query: sentenceQuery,
      targetObj: this,
      targetAttribute: sentenceTargetAttribute,
    });
    database.loadByQuery({
      query: tokensQuery,
      targetObj: this,
      targetAttribute: tokensTargetAttribute,
    });
    this.getRecentTrainingMatchHistory();
    this.featureDictInputValue = JSON.stringify(this.featureDict, null, 2);
  },
  methods: {
    getRecentTrainingMatchHistory() {
      database
        .get('pattern_training_matches/', {
          headers: { order: 'match_id desc', range: 'rows=0-50' },
        })
        .then(rows => {
          const match_ids = rows.map(row => row.match_id);
          return database.loadByIds(
            'matches',
            match_ids,
            this,
            'trainingMatchesHistory'
          );
        })
        .then(() => {
          const slotReprsAlready = []
          this.trainingMatchesHistory = this.trainingMatchesHistory.filter(
            match => {
              const slotRepr = this.matchSlotRepr(match)
              if (!slotReprsAlready.includes(slotRepr)) {
                slotReprsAlready.push(slotRepr)
                return slotRepr
              }
            }
          );
        });
    },
    isLoaded() {
      const sentenceLoaded = this.sentence !== null;
      const isLoaded = sentenceLoaded;
      return isLoaded;
    },
    roleSlotArrayToObj(roleSlots) {
      const obj = {};
      roleSlots.forEach(roleSlot => {
        const label = roleSlot.label;
        const tokens = roleSlot.tokens;
        obj[label] = tokens;
      });
      return obj;
    },
    submitTrainingMatch() {
      // POST training example to database. On success, show message and link to pattern table, and call pattern generation APi with training example ID. Listen, and show status in pattern table through "calculating" and "finding matches", and potentially "error".
      this.loading = !this.loading;
      const roleSlots = this.$refs.roleLabellingComponent.slots;
      const matchObj = this.roleSlotArrayToObj(roleSlots);
      const featureDict = this.featureDict;
      const sentenceId = this.sentenceId;
      const matchJSON = JSON.stringify({
        slots: matchObj,
        feature_dict: featureDict,
      });
      const data = {
        sentence_id: sentenceId,
        data: matchJSON,
      };
      console.log(data);
      database.post('matches/', data).then(matchRow => {
        const matchId = matchRow.id;
        console.log('match id:', matchId);
        this.loading = !this.loading;
        router.push({
          path: '/calculate-pattern',
          query: { pos_match_id: matchId },
        });
      });
    },
    matchSlotRepr(match) {
      const slotLabels = Object.keys(match.slots);
      const repr = slotLabels.join('-');
      return repr;
    },
  },
};
</script>

<style>
#features {
  margin-top: 40px;
}
#templates {
  margin-top: 40px;
}
</style>
