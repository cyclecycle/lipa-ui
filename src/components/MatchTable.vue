<template>
  <b-table
    :data="tableData"
    :loading="loading"
    :total="total"
    detailed
    detail-key="id"
    :show-detail-icon="true"
    paginated
    backend-pagination
    :per-page="perPage"
    @page-change="onPageChange"
    :row-class="(row, index) => row.isTrainingMatch && 'training-match'"
  >

    <template slot-scope="props">

      <b-table-column field="matchContent" label="Match content">
        {{ props.row.slotContent }}
      </b-table-column>

      <b-table-column field="document_id" label="Document ID">
        <router-link :to="`/document/?id=${props.row.document_id}`">
          {{ props.row.document_id }}
        </router-link>
      </b-table-column>

      <b-table-column field="sentence_id" label="Sentence ID">
        {{ props.row.sentence_id }}
      </b-table-column>

      <b-table-column
        field="id"
        label="Match ID"
        v-if="props.row.pattern_id !== undefined"
      >
        {{ props.row.id }}
      </b-table-column>


      <b-table-column
        field="pattern_id"
        label="Pattern ID"
        v-if="props.row.pattern_id !== undefined"
      >
        {{ props.row.pattern_id }}
      </b-table-column>

      <b-table-column>
        <b-tooltip label="Visualise match">
          <div
            v-if="props.row.isTrainingMatch !== true"
            @click="openMatchVisModal(props.row.id)"
            class="row-action"
          >
            <b-icon icon="eye"/>
          </div>
        </b-tooltip>
      </b-table-column>

<!--       <b-table-column field="validationStatus" label="validationStatus">
        <b-select v-model="props.row.validationStatus">
          <option
            v-for="option in validationOptions"
            :value="option.value"
            :key="option.value">
            {{ option.label }}
          </option>
        </b-select>
      </b-table-column> -->

    </template>

    <template slot="detail" slot-scope="props">
      <div>
        <AnnotatedText
          :text="props.row.sentence_data.text"
          :annotations="getAnnotations(props.row)"
          :getSpanClasses="getSpanClasses"
        />
      </div>
    </template>

    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>No matches found.</p>
        </div>
      </section>
    </template>

  </b-table>
</template>

<script>
import AnnotatedText from 'vue-annotated-text'
import util from '../util'


export default {
  name: 'MatchTable',
  props: {
    matches: Array,
    loading: Boolean,
    openMatchVisModal: Function,
    slotLabelsAsColumns: {
      type: Boolean,
      default: false,
    },
    noSlotLabels: {
      type: Boolean,
      default: false,
    },
    perPage: Number,
    onPageChange: Function,
    total: Number,
  },
  data() {
    return {
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
    // columns: function() {
    //   let columns = [...this.defaultMatchTableColumns]
    //   if (this.slotLabelsAsColumns) {
    //     const slotLabels = this.slotLabels
    //     const slotColumns = slotLabels.map(slotLabel => {
    //       const column = {
    //         field: slotLabel,
    //         label: slotLabel,
    //       }
    //       return column
    //     })
    //     columns = columns.concat(slotColumns)
    //   }
    //   return columns
    // },
    tableData: function() {
      let matches = this.matches
      matches = util.textifyMatchTokens(matches)
      matches = util.addSlotContentRepresentations(matches)
      return matches
    },
  },
  methods: {
    getAnnotations (match) {
      const annotations = util.matchToAnnotations(match)
      return annotations
    },
    toggle(row) {
        this.$refs.table.toggleDetails(row)
    },
    isvalidated(row) {
      return row.validationStatus === true
    },
    getSpanClasses(span) {
      if (span.annotationIds.length > 0) {
        return ['outline']
      } else {
        return []
      }
    },
  },
}
</script>

<style>
  .outline {
    outline: 1px solid black;
  }
  tr.training-match {
    background: #e6dfcf;
  }
  tr.training-match:hover {
    background: #e0dacc;
  }
</style>