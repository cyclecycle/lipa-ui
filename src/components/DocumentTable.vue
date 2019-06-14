<template>
  <b-table
    :data="documents"
    :columns="columns"
    selectable
    @select="rowSelected"
  >
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