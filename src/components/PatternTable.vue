<template>
  <b-table :data="patterns" :loading="loading">
    <template slot-scope="props">
      <b-table-column id="id" label="Pattern ID" width="150" numeric>
        {{ props.row.id }}
      </b-table-column>
      <!--       <b-table-column id="name" label="Name">
        {{ props.row.name }}
      </b-table-column> -->
      <b-table-column id="tokenLabels" label="Slot labels">
        {{ slotLabelsRepr(props.row.token_labels) }}
      </b-table-column>
      <b-table-column id="nTokens" label="Pattern Length">
        {{ props.row.token_labels.length }}
      </b-table-column>
      <b-table-column id="n_matches" label="# Matches" centered>
        <b-tooltip label="View matches">
          <router-link :to="matchTableLink(props.row.id)">
            {{ props.row.n_matches }}
          </router-link>
        </b-tooltip>
      </b-table-column>
      <b-table-column label="Actions" width="140" centered>
        <div class="level" style="padding-bottom: 0">
          <div class="level-item">
            <b-tooltip label="Visualise pattern">
              <div
                @click="openPatternVisModal(props.row.id)"
                class="row-action"
              >
                <b-icon icon="eye" />
              </div>
            </b-tooltip>
          </div>
          <div class="level-item">
            <b-tooltip label="Delete pattern">
              <div @click="confirmDeleteRow(props.row.id)" class="row-action">
                <b-icon icon="delete" />
              </div>
            </b-tooltip>
          </div>
        </div>
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
import util from '../util';

export default {
  name: 'PatternTable',
  props: {
    patterns: Array,
    loading: Boolean,
    deleteRow: Function,
    openPatternVisModal: Function,
  },
  methods: {
    confirmDeleteRow(rowId) {
      this.$dialog.confirm({
        message:
          'Confirm deletion.\n\nAll corresponding matches will also be deleted',
        onConfirm: () => this.deleteRow(rowId),
      });
    },
    matchTableLink(patternId) {
      const path = `/matches/?pattern_id=${patternId}`;
      return path;
    },
    slotLabelsRepr(tokenLabels) {
      let labelsUnique = [...new Set(tokenLabels)];
      labelsUnique = labelsUnique.filter(label => label !== null);
      const repr = labelsUnique.join(', ');
      return repr;
    },
  },
};
</script>
