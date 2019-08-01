<template>
  <div>
    <div class="title">User Guide</div>
    <section>
      <div class="subtitle">Importing Documents</div>
      <div>
        Open a terminal, go to the directory <code>lipa/lipa-db</code> and call the import script like so:
      </div><br>
      <div class="code-box">
        ../env/bin/python3 insert/import_documents_cli.py --corpus /path/to/file --id-field MY_ID_FIELD --content-fields MY_CONTENT_FIELD MY_OTHER_CONTENT_FIELD
      </div>
      <div>
        Where:<br><br>
          <ul>
            <li>
              <i>corpus</i> - is the path to a JSON file containing a list of documents,
            </li>
            <li>
              <i>id-field</i> - is the name of the field containing a unique ID for each document,
            </li>
            <li>
              <i>content-fields</i> - is a list of fields containing the content to be parsed and inserted.
            </li>
          </ul>
      </div>
    </section><br>
    <section>
      <div class="subtitle">Accessing Data</div>
      <div>
        Data is stored in an SQLite3 database at <code>lipa/lipa-db/databases/prod.db</code>.
        <br><br>
        The SQL schema is desribed in <code>lipa/lipa-db/sql</code>.
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'user-guide-view',
}

</script>

<style>
  .code-box {
    background: #f4f4f4;
    border: 1px solid #ddd;
    border-left: 3px solid #f36d33;
    color: #666;
    page-break-inside: avoid;
    font-family: monospace;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1em 1.5em;
    display: block;
    word-wrap: break-word;
  }
</style>