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
    const loadOnto = this
    const loadOntoAttribute = 'documents'
    const loadDocumentsQuery = 'documents_view'
    const loadingChunkSize = 5
    database.loadByQueryIteratively(loadDocumentsQuery, loadOnto, loadOntoAttribute, loadingChunkSize)
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