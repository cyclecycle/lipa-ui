<template>
  <div>
    <div class="title">Import documents</div>
    <section>

      <b-field
        label="Documents file path"
        message="Path to a JSON-formatted list of documents."
      >
        <b-input :value="documentsFilePath"></b-input>
      </b-field>

      <b-field
        label="ID field"
        message="Name of the field which uniquely identifies each document."
      >
        <b-input :value="idFieldValue"></b-input>
      </b-field>

      <b-field
        label="Content fields"
        message="Comma-delimited list of fields containing the document content to parse and import."
      >
        <b-input :value="contentFieldsValue"></b-input>
      </b-field>

      <b-button class="is-primary">
        Import
      </b-button>

    </section>
  </div>
</template>

<script>
export default {
  name: 'import-docs-view',
  computed: {
    contentFields: function () {
      return this.contentFieldsValue.split(',')
    },
  },
  data() {
    return {
      documentsFilePath: '',
      idFieldsValue: '',
      contentFieldsValue: '',
    }
  }
}
</script>
