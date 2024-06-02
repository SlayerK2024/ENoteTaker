const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const NOTES_FILE = path.join(__dirname, '../data/notes.json');

// Get all notes
router.get('/', (req, res) => {
    fs.readFile(NOTES_FILE, (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

// Create a new note
router.post('/', (req, res) => {
    const newNote = req.body;
    fs.readFile(NOTES_FILE, (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(NOTES_FILE, JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.status(201).json(newNote);
        });
    });
});

// Delete a note
router.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(NOTES_FILE, (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);
        fs.writeFile(NOTES_FILE, JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.status(204).end();
        });
    });
});

module.exports = router;
