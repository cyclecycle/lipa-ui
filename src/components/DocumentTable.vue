<template>
  <b-table
    :data="documents"
    selectable
    @select="rowSelected"
  >

  <template slot-scope="props">

    <b-table-column field="id" label="ID" numeric>
      {{ props.row.id }}
    </b-table-column>

    <b-table-column field="source_document_id" label="Source document ID" numeric>
      {{ props.row.source_document_id }}
    </b-table-column>

    <b-table-column field="section.0.text" label="Text">
      {{ props.row.sections[0].text | truncate(100) }}
    </b-table-column>

<!--     <b-table-column field="n_sentences" label="# Sentences" numeric>
      {{ props.row.n_sentences }}
    </b-table-column> -->

    <b-table-column field="n_matches" label="# Matches" numeric>
      {{ props.row.n_matches }}
    </b-table-column>

  </template>

  </b-table>
</template>

<script>
export default {
  name: 'DocumentTable',
  props: {
    documents: Array
  },
  data() {
    return {
      columns: [
        {
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true,
        },
        {
            field: 'source_document_id',
            label: 'Source document ID',
            width: '200',
            numeric: true,
        },
        {
            field: 'sections.0.text | truncate(80)',
            label: 'Text',
            width: '200',
        },
        {
            field: 'n_sentences',
            label: 'Number of sentences',
            centered: true,
        },
        {
            field: 'n_matches',
            label: 'Number of matches',
            centered: true,
        },
      ],
    }
  },
  methods: {
    rowSelected(row) {
      this.$router.push({ path: `/document/?id=${row.id}` })
    }
  },
  filters: {
    truncate(value, length) {
      return value.length > length
        ? value.substr(0, length) + '...'
        : value
    },
  }
}
</script>