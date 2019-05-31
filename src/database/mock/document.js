export default {
  document: {
    docId: 123456,
    title: 'The history of forging',
    body: 'Forging is performed by a smith using hammer and anvil.',
  },
  idFields: ['docId'],
  documentId: '123456',
  sectionFields: ['title', 'body'],
  sentences: [
    {
      id: 0,
      text: 'The history of forging',
      sentencePosition: 0,
      section: 'title',
      tokens: [
        {
          id: 1,
          text: 'The',
          start: 0,
          length: 3,
        },
        {
          id: 2,
          text: 'history',
          start: 4,
          length: 7,
        },
        {
          id: 3,
          text: 'of',
          start: 12,
          length: 2,
        },
        {
          id: 4,
          text: 'forging',
          start: 15,
          length: 7,
        },
      ]
    },
    {
      id: 1,
      text: 'Forging is performed by a smith using hammer and anvil.',
      section: 'body',
      sentencePosition: 0,
      tokens: [
        {
          id: 1,
          text: 'Forging',
          start: 0,
          length: 7,
        },
        {
          id: 2,
          text: 'is',
          start: 8,
          length: 2,
        },
        {
          id: 3,
          text: 'performed',
          start: 11,
          length: 9,
        },
        {
          id: 4,
          text: 'by',
          start: 21,
          length: 2,
        },
        {
          id: 5,
          text: 'a',
          start: 24,
          length: 1,
        },
        {
          id: 6,
          text: 'smith',
          start: 26,
          length: 5,
        },
        {
          id: 7,
          text: 'using',
          start: 32,
          length: 5,
        },
        {
          id: 8,
          text: 'hammer',
          start: 38,
          length: 6,
        },
        {
          id: 9,
          text: 'and',
          start: 45,
          length: 3,
        },
        {
          id: 10,
          text: 'anvil',
          start: 49,
          length: 5,
        },
        {
          id: 11,
          text: '.',
          start: 54,
          length: 1,
        },
      ],
    },
  ],
};
