<template>
  <b-table
    :data='patterns'
    :columns='columns'
    :loading="loading"
  >
  </b-table>
</template>

<script>
export default {
  name: 'PatternTable',
  props: {
    patterns: Array,
    loading: Boolean,
  },
  data() {
    return {
      data: [
        { 'id': 1, 'name': 'Pattern 1', 'status': '-', 'n_matches': '53'},
      ],
      columns: [
        {
            field: 'id',
            label: 'Pattern ID',
            width: '80',
            numeric: true
        },
        {
            field: 'name',
            label: 'Name',
        },
        // {
        //     field: 'status',
        //     label: 'Status',
        // },
        // {
        //     field: 'n_matches',
        //     label: '# Matches',
        //     centered: true
        // },
      ]
    }
  }
}
</script>