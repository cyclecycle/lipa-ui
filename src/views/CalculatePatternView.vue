<template>
  <div>
    <div class="title">Calculate Pattern</div>
    <div class="heading">Positive training example</div>
      <b-table
        :data="posTrainingExampleData"
        :columns="trainingExampleTableColumns">
      </b-table>
    <div class="heading">Negative training examples</div>
      <b-table
        :data="negTrainingExampleData"
        :columns="trainingExampleTableColumns">
      </b-table>
    <b-button
      type="is-primary"
      v-on:click="calculatePattern()"
    >
      Submit
    </b-button>
    <div v-if="patternResults">
      <h2>Results</h2>
      <h4>Pattern</h4>
      <p>[Visualisation]</p>
      <p>Matches 1 / 1 positive training examples</p>
      <p>Eliminated 9 / 10 negative training examples</p>
      <h4>Matches</h4>
      <p>[N matches]</p>
      <p>[Match table]</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calculate-pattern-view',
  props: {
    posTrainingExampleId: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      trainingExamples: [
        {
          id: 1,
          sentence_id: 2,
          pos_or_neg: 'pos',
        },
      ],
      trainingExampleTableColumns: [
        {
          field: 'id',
          label: 'ID',
          numeric: true,
        },
        {
          field: 'sentence_id',
          label: 'Sentence ID',
          numeric: true,
        },
      ],
      patternResults: null,
    }
  },
  computed: {
    posTrainingExampleData: function () {
      const posTrainingExamples = this.trainingExamples.filter(trainingExample => {
        return trainingExample.pos_or_neg === 'pos'
      })
      const posTrainingExampleData = [...posTrainingExamples]
      return posTrainingExampleData
    },
    negTrainingExampleData: function () {
      const negTrainingExamples = this.trainingExamples.filter(trainingExample => {
        return trainingExample.neg_or_neg === 'neg'
      })
      const negTrainingExampleData = [...negTrainingExamples]
      return negTrainingExampleData
    },
  },
  methods: {
    calculatePattern: function() {
      // Hit API, listen to status.
      this.patternResults = {}
    }
  }
}
</script>