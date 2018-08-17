import cuid from "cuid";
import moment from "moment";

let notes = [];

// Read existing notes from localStorage
const loadNotes = function() {
    const notesJSON = localStorage.getItem("notes");

    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
        return [];
    }
};

const getNotes = () => notes;

const createNote = () => {
    const id = cuid();
    const timestamp = moment().valueOf();

    notes.push({
        id: id,
        title: "",
        body: "",
        createdAt: timestamp,
        updatedAt: timestamp
    });

    saveNotes();
};

// Remove a note from the list
const removeNote = function(id) {
    const noteIndex = notes.findIndex(function(note) {
        return note.id === id;
    });

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        saveNotes();
    }
};

const sortNotes = function(sortBy) {
    console.log("sortBy in sortNotes: ", sortBy);

    if (sortBy === "byEdited") {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "byCreated") {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "alphabetical") {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        });
    } else {
        return notes;
    }
};

// Save the notes to localStorage
const saveNotes = function() {
    localStorage.setItem("notes", JSON.stringify(notes));
};

notes = loadNotes();

export { getNotes, createNote, removeNote, sortNotes };