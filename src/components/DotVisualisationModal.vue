<template>
  <div>
    <b-modal :active="true" @close="$emit('close')" width="100%">
      <b-loading :active.sync="loading" :is-full-page="true">
      </b-loading>
      <div class="card">
        <div v-show="!loading" class="level">
          <div class="level-item">
            <div class="heading">Graph</div>
            <div id="graph"></div>
          </div>
          <div class="level-item is-one-fifth" v-if="showLegend">
            <div class="heading">Slot labels</div>
            <div id="legend"></div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import patternAPI from '../pattern_api'
import { select } from 'd3-selection';
import 'd3-graphviz';

export default {
  name: 'dot-visualisation-modal',
  props: {
    model: {
      type: String,
    },
    id: {
      type: Number,
    },
    showLegend: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      graph: null,
      legend: null,
      loading: true,
    }
  },
  mounted() {
    const model = this.model
    const id = this.id
    this.getDot(model, id)
    this.setPatternAPIlistener()
  },
  methods: {
    setPatternAPIlistener() {
      const model = this.model
      const event = `visualise_${model}_success`
      const callback = (data) => {
        this.graph = data.graph
        this.legend = data.legend
        this.loading = false
        this.renderDotGraph(this.graph)
        if (this.legend !== undefined) {
          this.renderDotLegend(this.legend)
        }
      }
      patternAPI.on(event, callback)
    },
    getDot(model, id) {
      const payload = {}
      const idKey = `${model}_id`
      payload[idKey] = id
      const event = `visualise_${model}`
      patternAPI.emit(event, payload)
    },
    renderDotGraph(dot) {
      select("#graph")
        .graphviz()
          .renderDot(dot)
    },
    renderDotLegend(dot) {
      select("#legend")
        .graphviz()
          .renderDot(dot)
    },
  }
}
</script>