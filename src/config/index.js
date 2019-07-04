const config = {
  env: 'test',
  databaseRestUrl: 'http://localhost:8085/',
  patternApiUrl: 'http://localhost:5000/',
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
