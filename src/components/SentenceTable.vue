<template>
  <b-table :data='data' :columns='columns'></b-table>
</template>

<script>
export default {
  name: 'SentenceTable',
  props: {
    sentences: Array
  },
  data() {
    return {
      data: [
        { 'document_id': 1, id: 1, 'text': 'A sentence from a document...', 'n_matches': 1},
      ],
      columns: [
        {
            field: 'id',
            label: 'ID',
            numeric: true,
        },
        {
            field: 'document_id',
            label: 'Document ID',
            numeric: true,
        },
        {
            field: 'text',
            label: 'Text',
        },
        {
            field: 'n_matches',
            label: 'Number of matches',
            centered: true,
        },
      ]
    }
  }
}
</script>