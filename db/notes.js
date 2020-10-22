const util = require("util");
const fs = require("fs");
const {v4 : uuidv4} = require("uuid");

const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

let deletedElement;

class Notes {
    read(){
        return readFromFile("db/db.json", "utf8");
    }
    write(note) {
        return writeToFile("db/db.json", JSON.stringify(note));
    }
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        })
    }
    addNote(note){
        const { title, text } = note;
        if (!title || !text){
            throw new Error("Cannot be blank")
        }
        const newNote = {title, text, id: uuidv4()};
        return this.getNotes().then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote)
    }

    deleteNote(note){
        return this.getNotes().then((notes) => {
            notes.forEach(async function(element){
                if (element.id == note.id){
                    deletedElement = element;
                }
            })
            const noteIndex = notes.indexOf(deletedElement);
            notes.splice(noteIndex, 1);
            this.write(notes);
            return notes;
        })
    }
}

module.exports = new Notes();