<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="title">Documents</div>
        </div>
      </div>
<!--       <div class="level-right">
        <div class="level-item">
          <button type="button" class="button is-small">
            Documents: 120
          </button>
        </div>
        <div class="level-item">
          <button type="button" class="button is-small">
            Sentences: 1443
          </button>
        </div>
        <div class="level-item">
          <button type="button" class="button is-small">
            Pattern matches: 595
          </button>
        </div>
      </div> -->
    </div>
    <DocumentTable
      :documents="documents"
    />
  </div>
</template>

<script>
import DocumentTable from '../components/DocumentTable.vue'
import database from '../database'

export default {
  name: 'DocumentsView',
  components: {
    DocumentTable,
  },
  data() {
    return {
      documents: [],
    }
  },
  mounted() {
    const query = 'documents_view'
    const targetAttribute = 'documents'
    const chunkSize = 5
    const loadParams = {
      targetObj: this,
      query,
      targetAttribute,
      chunkSize,
    }
    database.loadByQueryIteratively(loadParams)
  },
  methods: {
    isLoaded: function () {
      const documentsLoaded = this.documents.length > 0
      console.log(this.documents)
      return documentsLoaded
    },
  }
}
</script>