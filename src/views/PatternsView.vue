<template>
  <div>
    <div class="title">Patterns</div>
    <div>
      <PatternTable
        :patterns="patterns"
        :loading="loading"
        :deleteRow="deletePattern"
      />
    </div>
  </div>
</template>

<script>
import database from '../database'
import util from '../util'
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
      loading: true,
    }
  },
  mounted() {
    database.loadByQueryIteratively('patterns_view', this, 'patterns')
      .then(() => {
        this.loading = false
      })
  },
  methods: {
    onDeleteSuccess(patternId) {
      this.$toast.open({
        message: `Deleted pattern: ID ${patternId}`,
        type: 'is-dark',
      })
      this.patterns = util.removeObjById(this.patterns, patternId)
    },
    onDeleteFail(patternId) {
      this.$toast.open({
        message: `Something went wrong`,
        type: 'is-warning',
      })
    },
    deletePattern (patternId) {
      database.deleteRow('patterns', patternId)
        .then(e => {
          if (e === undefined) {
            this.onDeleteSuccess(patternId)
          } else {
            this.onDeleteFail(patternId)
          }
        })
    },
  }
}
</script>

<style>
</style>