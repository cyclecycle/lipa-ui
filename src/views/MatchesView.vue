<template>
  <div>
    <h2>Matches</h2>
    <div v-if="isLoaded()">
      <div v-for="match in matches">
        {{ match }}
      </div>
    </div>
    <MatchTable :matches="matches" />
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
    // database.loadMatches(this)
  },
  methods: {
    isLoaded: function() {
      const matchesLoaded = this.matches.length > 0
      const isLoaded = (matchesLoaded)
      return isLoaded
    },
  }
}
</script>