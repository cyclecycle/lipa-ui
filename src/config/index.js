const DB_PORT = process.env.VUE_APP_DB_PORT || 8085;
const PATTERN_API_PORT = process.env.VUE_APP_PATTERN_API_PORT || 5000;

const config = {
  env: 'test',
  databaseRestUrl: `http://localhost:${DB_PORT}/`,
  patternApiUrl: `http://localhost:${PATTERN_API_PORT}/`,
  importDocumentsCLI: '/home/nickm/Documents/dev/lipa-db/insert_documents_cli.py',
  databaseLoadingChunkSize: 5,
  databaseJsonFields: [ // Fields which require JSON parsing
    'data',
    'match_data',
    'sentence_data',
  ], 
  databaseUnpackFields: [ // Unpack values from these fields into the parent object
    'data',
    'match_data',
  ],
};

export default config;
