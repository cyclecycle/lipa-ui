<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="title">Documents</div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button type="button" class="button is-small">
            Total documents: 120
          </button>
        </div>
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
    <DocumentTable />
  </div>
</template>

<script>
import DocumentTable from '../components/DocumentTable.vue'

export default {
  name: 'DocumentsView',
  components: {
    DocumentTable,
  }
}
</script>