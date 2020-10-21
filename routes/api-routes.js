const router = require("express").Router();
const note = require("../db/notes.js");

router.get("/notes", (req, res) => {
    note.getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err))
})

router.post("/notes", (req, res) => {
    note.addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err))
})

module.exports = router;