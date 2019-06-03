<template>
  <b-table
    :data='data'
    :columns='columns'
    selectable
    @select="rowSelected"
  >
  </b-table>
</template>

<script>
export default {
  name: 'DocumentTable',
  props: {
    patterns: Array
  },
  data() {
    return {
      data: [
        { 'source_document_id': 244567, id: 1, 'title': 'Document title', 'n_matches': 53, 'n_sentences': 14},
      ],
      columns: [
        {
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true,
        },
        {
            field: 'title',
            label: 'Title',
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
  }
}
</script>