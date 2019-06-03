/*
These functions are loaded into the database class so that
they can be called like:
database.loadDocument(this, documentId)
*/

import util from './util';


const databasePostingHelpersMixin = {
  postTrainingExample(trainingExample) {
    // database = this.database
    // const query = 'training_examples/'
    // const trainingExampleJSON = JSON.stringify(trainingExample)
    // const payload = {
    //   data: trainingExampleJSON
    // } 
    // return database.post(query, trainingExampleJSON)
    return new Promise((resolve, reject) => {
      console.log('Post training example')
      resolve()
    })
  }
}

export default databasePostingHelpersMixin;
