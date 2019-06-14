<template>
  <b-table
    :data='patterns'
    :loading="loading"
  >

    <template slot-scope="props">
      <b-table-column id="id" label="Pattern ID" width="150" numeric>
        {{ props.row.id }}
      </b-table-column>
      <b-table-column id="name" label="Name">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column id="n_matches" label="# Matches" centered>
        <router-link :to="matchTableLink(props.row.id)">
          {{ props.row.n_matches }}
        </router-link>
      </b-table-column>
      <b-table-column>
        <b-button @click="deleteRow(props.row.id)">
          Delete
        </b-button>
      </b-table-column>
    </template>

    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>No patterns found.</p>
        </div>
      </section>
    </template>

  </b-table>
</template>

<script>
import router from '../router';
import database from '../database';

export default {
  name: 'PatternTable',
  props: {
    patterns: Array,
    loading: Boolean,
    deleteRow: Function,
  },
  methods: {
    matchTableLink (patternId) {
      const path = `/matches/?pattern_id=${patternId}`
      return path
    },
  }
}
</script>