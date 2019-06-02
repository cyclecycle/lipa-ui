<template>
  <div>
    <h2>Patterns</h2>
    <div v-if="isLoaded()">
      <div v-for="pattern in patterns">
        {{ pattern }}
      </div>
    </div>
  </div>
</template>

<script>
import database from '../database'

export default {
  name: 'PatternsView',
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