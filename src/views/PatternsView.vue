<template>
  <div>
    <div class="title">Patterns</div>
    <div>
      <PatternTable
        :patterns="patterns"
        :loading="!isLoaded()"
      />
    </div>
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
    database.loadByQueryIteratively('patterns_view', this, 'patterns')
  },
  methods: {
    isLoaded: function() {
      const patternsLoaded = this.patterns.length > 0
      const isLoaded = patternsLoaded
      return isLoaded
    },
  }
}
</script>

<style>
</style>