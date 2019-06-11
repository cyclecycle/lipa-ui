const config = {
  env: 'test',
  databaseRestUrl: 'http://localhost:8085/',
  databasePath: '/home/nickm/Documents/dev/lipa-db/databases/test.db',
  patternApiUrl: 'http://localhost:5000/',
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
