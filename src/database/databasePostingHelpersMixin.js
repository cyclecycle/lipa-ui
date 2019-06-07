/*
These functions are loaded into the database class so that
they can be called like:
database.loadDocument(this, documentId)
*/

import util from './util';


const databasePostingHelpersMixin = {
  postMatch(match, sentenceId) {
    const database = this
    const query = 'matches/'
    const matchJSON = JSON.stringify({slots: match})
    const matchRow = {
      sentence_id: sentenceId,
      data: matchJSON,
    } 
    return database.post(query, matchRow)
  }
}

export default databasePostingHelpersMixin;
