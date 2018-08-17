import moment from "moment";

import { getFilters } from "./filters";
import { sortNotes, getNotes } from "./notes";

// Generate the DOM structure for a note
const generateNoteDOM = function(note) {
    const noteEl = document.createElement("a");
    const textEl = document.createElement("p");
    const statusEl = document.createElement("p");

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

// Render application notes
const renderNotes = function() {
    const notesEl = document.querySelector("#notes");
    const filters = getFilters();
    const notes = sortNotes(filters.sortBy);

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

const initializeEditPage = noteId => {
    const noteTitleEl = document.getElementById("note-title");
    const noteBodyEl = document.getElementById("note-body");
    const updatedDateEl = document.getElementById("last-updated");

    const notes = getNotes();

    const note = notes.find(note => note.id === noteId);

    if (!note) {
        location.assign("/index.html");
    }

    noteTitleEl.value = note.title;
    noteBodyEl.value = note.body;
    updatedDateEl.textContent = generateLastUpdated(note.updatedAt);
};

export {
    renderNotes,
    generateNoteDOM,
    generateLastUpdated,
    initializeEditPage
};
