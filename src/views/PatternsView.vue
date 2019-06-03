<template>
  <div>
    <h2>Patterns</h2>
    <div v-if="isLoaded()">
      <div v-for="pattern in patterns">
        {{ pattern }}
      </div>
    </div>
    <PatternTable :patterns="patterns" />
  </div>
</template>

<script>
import database from '../database'
import PatternTable from '../components/PatternTable.vue'

export default {
  name: 'PatternsView',
  props: {
    highlightPatternId: {
      type: Number,
      default: 1,
    },
  },
  components: {
    PatternTable
  },
  data() {
    return {
      patterns: [],
    }
  },
  mounted() {
    database.loadPatterns(this)
  },
  methods: {
    isLoaded: function() {
      const patternsLoaded = this.patterns.length > 0
      const isLoaded = (patternsLoaded)
      return isLoaded
    },
  }
}
</script>

<style>
</style>