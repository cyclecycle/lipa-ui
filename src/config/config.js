const config = {
  env: 'test',
  databaseRestUrl: 'http://localhost:8085/',
  databaseJsonFields: [ // Fields which require JSON parsing
    'data',
    'match_data',
    'sentence_data'
  ], 
  patternApiUrl: 'http://localhost:5000/',
};

export default config;
