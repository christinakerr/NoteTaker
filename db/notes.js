const util = require("util");
const fs = require("fs");
const {v4 : uuidv4} = require("uuid");

const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

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
                console.log(parsedNotes);
            } catch (err) {
                parsedNotes = [];
            }
            console.log(parsedNotes);
            return parsedNotes;
        })
    }
    addNote(note){
        const { title, text } = note;
        console.log(note);
        if (!title || !text){
            throw new Error("Cannot be blank")
        }
        const newNote = {title, text, id: uuidv4()};
        console.log(newNote);
        return this.getNotes().then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote)
    }
}

module.exports = new Notes();