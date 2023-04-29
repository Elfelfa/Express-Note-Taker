const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../../helpers/fsUtils');
const uuid = require('../../helpers/uuid');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    
    const newNote = {
        title: title,
        text: text,
        id: uuid()
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Notes added successfully 🚀`);
  } else {
    res.error('Error in adding  notes');
  }
});

notes.delete('/:id', (req, res) => {
  var myNotes = [];
  
  readFromFile('./db/db.json')
  .then((data) => 
      myNotes.concat(JSON.parse(data)));

  for (let i = 0; i < myNotes.length; i++)
  {
    if (myNotes[i] === res.params.id)
    {
      myNotes.splice(i, 1);
    }
  }

  writeToFile('./db/db.json', myNotes);
});

module.exports = notes;
