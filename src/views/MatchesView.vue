<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="title">Matches</div>
      </div>
    </div>
    <MatchTable
      :matches="matches"
      :loading="loading"
      :openMatchVisModal="openMatchVisModal"
    />

    <DotVisualisationModal
      v-if="showMatchVisModal"
      :matchId="activeMatchId"
      @close="showMatchVisModal = false"
      :showLegend="true"
    />

  </div>
</template>

<script>
import database from '../database'
import MatchTable from '../components/MatchTable.vue'
import DotVisualisationModal from '../components/DotVisualisationModal.vue'


export default {
  name: 'MatchesView',
  props: {
    patternId: {
      type: Number,
      default: NaN,
    }
  },
  components: {
    MatchTable,
    DotVisualisationModal,
  },
  data() {
    return {
      matches: [],
      loading: true,
      activeMatchId: null,
      showMatchVisModal: false,
    }
  },
  mounted() {
    let matchesQuery = 'pattern_matches_view'
    if (!isNaN(this.patternId)) {
      matchesQuery = matchesQuery + `/?pattern_id=${this.patternId}`
    }
    database.loadByQueryIteratively(matchesQuery, this, 'matches')
      .then(() => {
        this.loading = false
      })
  },
  methods: {
    openMatchVisModal (matchId) {
      this.activeMatchId = matchId
      this.showMatchVisModal = true
    },
  }
}
</script>