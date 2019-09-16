<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="title">Patterns</div>
      </div>
    </div>
    <div>
      <PatternTable
        :patterns="patterns"
        :loading="loading"
        :deleteRow="deletePattern"
        :openPatternVisModal="openPatternVisModal"
      />
    </div>

    <DotVisualisationModal
      v-if="showPatternVisModal"
      model="pattern"
      :id="activePatternId"
      @close="showPatternVisModal = false"
      :showLegend="true"
    />

  </div>
</template>

<script>
import database from '../database'
import util from '../util'
import PatternTable from '../components/PatternTable.vue'
import DotVisualisationModal from '../components/DotVisualisationModal.vue'

export default {
  name: 'PatternsView',
  props: {
    highlightPatternId: {
      type: Number,
      default: 1,
    },
  },
  components: {
    PatternTable,
    DotVisualisationModal,
  },
  data() {
    return {
      patterns: [],
      loading: false,
      modalLoading: false,
      showPatternVisModal: false,
      activePatternId: null,
    }
  },
  mounted() {
    const query = 'patterns_view'
    const loadOntoTarget = this
    const targetAttribute = 'patterns'
    database.loadByQueryIteratively({
      targetObj: this,
      targetAttribute,
      query,
    }).then(() => {
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
    openPatternVisModal (patternId) {
      this.activePatternId = patternId
      this.showPatternVisModal = true
    },
  }
}
</script>
