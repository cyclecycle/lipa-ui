<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="title">Matches</div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div
            v-if="isNaN(patternId)"
            class="button is-small"
            style="cursor: default"
          >
            {{ matchesCount }} matches
          </div>
        </div>
      </div>
    </div>
    <MatchTable
      :matches="matches"
      :total="matchesCount"
      :perPage="matchesPerPage"
      :onPageChange="loadMatches"
      :loading="loading"
      :openMatchVisModal="openMatchVisModal"
    />

    <DotVisualisationModal
      v-if="showMatchVisModal"
      model="match"
      :id="activeMatchId"
      @close="showMatchVisModal = false"
      :showLegend="true"
    />
  </div>
</template>

<script>
import database from '../database';
import MatchTable from '../components/MatchTable.vue';
import DotVisualisationModal from '../components/DotVisualisationModal.vue';

export default {
  name: 'MatchesView',
  props: {
    patternId: {
      type: Number,
      default: NaN,
    },
  },
  components: {
    MatchTable,
    DotVisualisationModal,
  },
  data() {
    return {
      matches: [],
      matchesPerPage: 30,
      matchesCountResult: { count: 0 },
      loading: true,
      activeMatchId: null,
      showMatchVisModal: false,
    };
  },
  computed: {
    matchesCount() {
      return this.matchesCountResult.count;
    },
  },
  mounted() {
    this.loadMatchesCount();
    const page = 1;
    this.loadMatches(page);
    if (!isNaN(this.patternId)) {
      this.loadTrainingMatch();
    }
  },
  methods: {
    loadMatchesCount() {
      let query = 'pattern_matches_count_view';
      if (!isNaN(this.patternId)) {
        query = query + `/?pattern_id=${this.patternId}`;
      }
      const targetAttribute = 'matchesCountResult';
      database.loadOneByQuery({
        targetObj: this,
        targetAttribute,
        query,
      });
    },
    loadTrainingMatch() {
      const query = `pattern_training_matches_view/?pattern_id=${
        this.patternId
      }`;
      database.get(query).then(items => {
        const item = items[0];
        item.isTrainingMatch = true;
        this.matches.unshift(item);
      });
    },
    loadMatches(page) {
      console.log(page);
      this.loading = true;
      let query = 'pattern_matches_view';
      if (!isNaN(this.patternId)) {
        query = query + `/?pattern_id=${this.patternId}`;
      }
      const targetAttribute = 'matches';
      console.log('page:', page);
      const startRow = (page - 1) * this.matchesPerPage;
      const rowLimit = startRow + this.matchesPerPage;
      const chunkSize = 5;
      const loadParams = {
        targetObj: this,
        query,
        targetAttribute,
        startRow,
        rowLimit,
        chunkSize,
      };
      console.log(loadParams);
      database.loadByQueryIteratively(loadParams).then(() => {
        this.loading = false;
      });
    },
    openMatchVisModal(matchId) {
      this.activeMatchId = matchId;
      this.showMatchVisModal = true;
    },
  },
};
</script>
