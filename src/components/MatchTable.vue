<template>
  <b-table
    :data="tableData"
    :columns="columns"
    :loading="loading"
    detailed
    detail-key="id"
    :show-detail-icon="true"
  >
    <!-- <template slot-scope="props">
      <b-table-column field="validationStatus" label="validationStatus">
        <b-select v-model="props.row.validationStatus">
          <option
            v-for="option in validationOptions"
            :value="option.value"
            :key="option.value">
            {{ option.label }}
          </option>
        </b-select>
      </b-table-column>
    </template> -->
    <template slot="detail" slot-scope="props">
      <div>
        <AnnotatedText
          :text="matchSentence"
          :annotations="matchAnnotations"
          :getSpanClasses="getSpanClasses"
        />
      </div>
    </template>
  </b-table>
</template>

<script>
import AnnotatedText from 'vue-annotated-text'


export default {
  name: 'MatchTable',
  props: {
    matches: Array,
    loading: Boolean,
    slotLabelsAsColumns: {
      type: Boolean,
      default: false,
    },
    noSlotLabels: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      defaultMatchTableColumns: [
        {
          field: 'slotContent',
          label: 'Match content',
        },
        {
          field: 'id',
          label: 'Match ID',
          numeric: true,
          width: 100,
        },
        {
          field: 'sentence_id',
          label: 'Sentence ID',
          numeric: true,
          width: 140,
        },
      ],
      validationOptions: [
        {
          label: 'Unvalidated',
          value: 'unvalidated',
        },
        {
          label: 'Valid',
          value: 'valid',
        },
        {
          label: 'Invalid',
          value: 'invalid',
        },
      ],
      matchSentence: 'The amyloid-beta oligomer hypothesis was introduced in 1998',
      matchAnnotations: [
        {
          id: 1,
          start: 26,
          length: 10,
          label: 'slot1'
        },
        {
          id: 2,
          text: 'was',
          start: 37,
          length: 3,
          label: 'slot2',
        },
        {
          id: 2,
          text: 'introduced',
          start: 41,
          length: 10,
          label: 'slot2',
        },
      ],
    }
  },
  computed: {
    slotLabels: function() {
      const posMatch = this.matches[0]
      if (posMatch === undefined) {
        return []
      }
      const slots = posMatch.slots
      const slotLabels = Object.keys(slots)
      return slotLabels
    },
    columns: function() {
      let columns = [...this.defaultMatchTableColumns]
      if (this.slotLabelsAsColumns) {
        const slotLabels = this.slotLabels
        const slotColumns = slotLabels.map(slotLabel => {
          const column = {
            field: slotLabel,
            label: slotLabel,
          }
          return column
        })
        columns = columns.concat(slotColumns)
      }
      return columns
    },
    tableData: function() {
      let matches = this.matches
      matches = this.textifyMatchTokens(matches)
      matches = this.addSlotContentRepresentations(matches)
      return matches
    },
  },
  methods: {
    textifyMatchTokens: function(matches) {
      const textifiedMatches = matches.map(match => {
        const slotLabels = Object.keys(match.slots)
        const textifiedMatch = {...match}
        slotLabels.forEach(label => {
          const tokens = textifiedMatch.slots[label]
          const tokenTexts = tokens.map(token => token.text)
          const joinedTokenTexts = tokenTexts.join(', ')
          textifiedMatch[label] = joinedTokenTexts
        })
        return textifiedMatch
      })
      return textifiedMatches
    },
    addSlotContentRepresentations: function(matches) {
      const modifiedMatches = matches.map(match => {
        const slotRepresentations = []
        const slotLabels = Object.keys(match.slots)
        slotLabels.forEach(label => {
          const tokens = match.slots[label]
          const tokenTexts = tokens.map(token => token.text)
          const joinedTokenTexts = tokenTexts.join(', ')
          let repr = ''
          if (this.noSlotLabels) {
            repr = `[${joinedTokenTexts}]`
          } else {
            repr = `${label}: [${joinedTokenTexts}]`
          }
          slotRepresentations.push(repr)
        })
        const joinedSlotRepresentations = slotRepresentations.join(' ')
        match.slotContent = joinedSlotRepresentations
        return match
      })
      return modifiedMatches
    },
    toggle(row) {
        this.$refs.table.toggleDetails(row)
    },
    isvalidated(row) {
      return row.validationStatus === true
    },
    getSpanClasses(span) {
      if (span.annotationIds.length > 0) {
        return ['annotated-span']
      } else {
        return []
      }
    }
  },
}
</script>

<style>
  .annotated-span {
    outline: 1px solid black;
  }
</style>