<template>
  <b-table :data='data' :columns='columns'></b-table>
</template>

<script>
export default {
  name: 'PatternTable',
  props: {
    patterns: Array
  },
  data() {
    return {
      data: [
        { 'id': 1, 'name': 'Pattern 1', 'status': '-', 'n_matches': '53'},
      ],
      columns: [
        {
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true
        },
        {
            field: 'name',
            label: 'Name',
        },
        {
            field: 'status',
            label: 'Status',
        },
        {
            field: 'n_matches',
            label: '# Matches',
            centered: true
        },
      ]
    }
  }
}
</script>