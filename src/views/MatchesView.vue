<template>
  <div>
    <div class="title">Matches</div>
    <MatchTable
      :matches="matches"
      :loading="loading"
    />
  </div>
</template>

<script>
import database from '../database'
import MatchTable from '../components/MatchTable.vue'

export default {
  name: 'MatchesView',
  props: {
    patternId: {
      type: Number,
      default: NaN,
    }
  },
  components: {
    MatchTable
  },
  data() {
    return {
      matches: [],
      loading: true,
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
}
</script>