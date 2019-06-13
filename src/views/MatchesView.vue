<template>
  <div>
    <div class="title">Matches</div>
    <MatchTable
      :matches="matches"
      :loading="!isLoaded()"
    />
  </div>
</template>

<script>
import database from '../database'
import MatchTable from '../components/MatchTable.vue'

export default {
  name: 'MatchesView',
  components: {
    MatchTable
  },
  data() {
    return {
      matches: [],
    }
  },
  mounted() {
    database.loadByQuery('matches', this, 'matches')
  },
  methods: {
    isLoaded: function() {
      const matchesLoaded = this.matches.length > 0
      const isLoaded = matchesLoaded
      console.log(this.matches)
      return isLoaded
    },
  }
}
</script>