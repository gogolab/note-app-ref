import cuid from "cuid";
import moment from "moment";

let notes;

// Read existing notes from localStorage
const loadNotes = function() {
    const notesJSON = localStorage.getItem("notes");

    try {
        notes = notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
        notes = [];
    }
};

const getNotes = () => {
    return notes;
};

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

    return id;
};

const updateNote = (id, updates) => {
    const note = notes.find(note => note.id === id);

    if (!note) {
        return;
    }

    if (typeof updates.title === "string") {
        note.title = updates.title;
        note.updatedAt = moment().valueOf();
    }

    if (typeof updates.body === "string") {
        note.body = updates.body;
        note.updatedAt = moment().valueOf();
    }

    saveNotes();

    return note;
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

loadNotes();

export { getNotes, createNote, removeNote, sortNotes, updateNote, loadNotes };
