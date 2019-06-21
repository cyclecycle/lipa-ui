<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="title">Visualiser</div>
      </div>
    </div>
    <div id="graph"></div>
    <div id="legend"></div>
  </div>
</template>

<script>
import patternAPI from '../pattern_api'
import { select } from 'd3-selection';
import 'd3-graphviz';


export default {
  name: 'visualise-view',
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
  },
  data() {
    return {
      graph: null,
      legend: null,
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
      console.log(this.patternId)
      const event = `visualise_${model}`
      const success_event = `visualise_${model}_success`
      const payload = {}
      const idKey = `${model}_id`
      payload[idKey] = id
      patternAPI.socket.emit(event, payload)
      patternAPI.socket.on(success_event, (data) => {
        console.log(data)
        this.graph = data.graph
        this.legend = data.legend
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