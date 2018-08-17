"use strict";

// Read existing notes from localStorage
const getSavedNotes = function() {
    const notesJSON = localStorage.getItem("notes");

    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
        return [];
    }
};

// Save the notes to localStorage
const saveNotes = function(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
};

// Remove a note from the list
const removeNote = function(id) {
    const noteIndex = notes.findIndex(function(note) {
        return note.id === id;
    });

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
    }
};

// Generate the DOM structure for a note
const generateNoteDOM = function(note) {
    const noteEl = document.createElement("a");
    const textEl = document.createElement("p");
    const statusEl = document.createElement("p");

    // const button = document.createElement("button");

    // // Setup the remove note button
    // button.textContent = "x";
    // noteEl.appendChild(button);
    // button.addEventListener("click", function() {
    //     removeNote(note.id);
    //     saveNotes(notes);
    //     renderNotes(notes, filters);
    // });

    // Setup the note title text
    // textEl.textContent = note.title.length ? note.title : "Unnamed note";
    noteEl.classList.add("list-item");

    textEl.textContent = note.title || "Unnamed note";
    noteEl.setAttribute("href", `edit.html#${note.id}`);
    textEl.classList.add("list-item__title");
    noteEl.appendChild(textEl);

    statusEl.textContent = generateLastUpdated(note.updatedAt);
    statusEl.classList.add("list-item__subtitle");
    noteEl.appendChild(statusEl);

    return noteEl;
};

const sortNotes = function(notes, sortBy) {
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

// Render application notes
const renderNotes = function(notes, filters) {
    const notesEl = document.querySelector("#notes");

    notes = sortNotes(notes, filters.sortBy);

    const filteredNotes = notes.filter(function(note) {
        return note.title
            .toLowerCase()
            .includes(filters.searchText.toLowerCase());
    });

    notesEl.innerHTML = "";

    if (filteredNotes.length > 0) {
        filteredNotes.forEach(function(note) {
            const noteEl = generateNoteDOM(note);
            notesEl.appendChild(noteEl);
        });
    } else {
        const empytMessage = document.createElement("p");
        empytMessage.textContent = "No notes to show.";
        empytMessage.classList.add("empty-message");

        notesEl.appendChild(empytMessage);
    }
};

const generateLastUpdated = function(timestamp) {
    return `last updated: ${moment(timestamp).fromNow()}.`;
};
