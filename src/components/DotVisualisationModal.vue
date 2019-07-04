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
    patternId: {
      type: Number,
      default: NaN,
    },
    sentenceId: {
      type: Number,
      default: NaN,
    },
    matchId: {
      type: Number,
      default: NaN,
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
    if (!isNaN(this.patternId)) {
      this.getDot('pattern', this.patternId)
    }
    if (!isNaN(this.sentenceId)) {
      this.getDot('sentence', this.sentenceId)
    }
    if (!isNaN(this.matchId)) {
      this.getDot('match', this.matchId)
    }
  },
  methods: {
    getDot(model, id) {
      const event = `visualise_${model}`
      const success_event = `visualise_${model}_success`
      const payload = {}
      const idKey = `${model}_id`
      payload[idKey] = id
      patternAPI.socket.emit(event, payload)
      patternAPI.socket.on(success_event, (data) => {
        this.graph = data.graph
        this.legend = data.legend
        this.loading = false
        this.renderDotGraph(this.graph)
        this.renderDotLegend(this.legend)
      })
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