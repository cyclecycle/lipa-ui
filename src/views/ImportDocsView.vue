<template>
  <div>
    <div class="title">Import documents</div>
    <section>

      <b-field
        label="Documents file path"
        message="Path to a JSON-formatted list of documents."
        id="file-path"
      >
        <b-input :value="documentsFilePath"></b-input>
      </b-field>

      <b-field
        label="ID field"
        message="Name of the field which uniquely identifies each document."
        id="id-field"
      >
        <b-input :value="idFieldValue"></b-input>
      </b-field>

      <b-field
        label="Content fields"
        message="Comma-delimited list of fields containing the content to parse and import."
        id="content-fields"
      >
        <b-input v-model="contentFieldsValue"></b-input>
      </b-field>

      <b-button
        class="is-primary"
        id="import-button"
        @click="importDocuments">
        Import
      </b-button>

    </section>
  </div>
</template>

<script>
import { spawn } from 'child_process'

export default {
  name: 'import-docs-view',
  data() {
    return {
      documentsFilePath: '',
      idFieldValue: '',
      contentFieldsValue: '',
    }
  },
  computed: {
    contentFields: function () {
      let fields = this.contentFieldsValue.split(',')
      fields = fields.map(field => field.trim())
      return fields
    },
  },
  methods: {
    importDocuments() {
      console.log(this.contentFields)
      const lipaDBDir = '../lipa-db'
      const importScriptPath = 'insert/import_documents.cli.py > test.log'
      const proc = spawn('python3', [
          importScriptPath,
        ], {
          cwd: lipaDBDir,
        }
      )
      proc.stderr.on('data', function (err) {
        console.log(`${err}`)
      })
      proc.stdout.on('data', async (data) => {
        console.log(data)
      })
    }
  }
}
</script>
