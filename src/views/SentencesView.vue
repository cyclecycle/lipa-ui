<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="title">Sentences</div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button type="button" class="button is-small">
            Total sentences: 1443
          </button>
        </div>
        <div class="level-item">
          <button type="button" class="button is-small">
            Total pattern matches: 595
          </button>
        </div>
      </div>
    </div>
    <SentenceTable />
  </div>
</template>

<script>
import SentenceTable from '../components/SentenceTable.vue'

export default {
  name: 'SentencesView',
  components: {
    SentenceTable,
  }
}
</script>