<template>
  <section>
    <b-table
      :data='data'
      :columns='columns'
      detailed
      detail-key="id"
      @details-open="(row, index) => $toast.open(`Expanded ${row.id}`)"
      :show-detail-icon="true"
    >
    <template slot-scope="props">
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
    </template>
      <template slot="detail" slot-scope="props">
        <div>
          <AnnotatedText
            :text="matchSentence"
            :annotations="matchAnnotations"
            :spanClasses="['span-class']"
          />
        </div>
      </template>

    </b-table>
  </section>
</template>

<script>
import AnnotatedText from 'vue-annotated-text'


export default {
  name: 'MatchTable',
  props: {
    matches: Array
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
      data: [
        { 'id': 1, 'patternId': '1', 'patternName': 'Pattern 1', 'document_id': 1, 'desired': true, 'validationStatus': 'unvalidated'},
      ],
      columns: [
        {
            field: 'id',
            label: 'Match ID',
            numeric: true,
            sortable: true,
        },
        {
            field: 'patternName',
            label: 'Pattern',
            sortable: true,
        },
        {
            field: 'document_id',
            label: 'Document ID',
            centered: true,
            sortable: true,
        },
        {
            field: 'desired',
            label: 'Desired',
            centered: true,
            sortable: true,
        },
      ]
    }
  },
  methods: {
    toggle(row) {
        this.$refs.table.toggleDetails(row)
    },
    isvalidated(row) {
      return row.validationStatus === true
    },
    // getAnnotationColor(annotation) {
    //   if (annotation.label == 'slot1') {
    //     return '#42b0f4'
    //   }
    // }
  }
}
</script>

<style>
  .span-class {
    outline: 1px solid black;
  }
</style>