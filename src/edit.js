import { initializeEditPage, generateLastUpdated } from "./views";
import { updateNote, removeNote } from "./notes";

const noteTitleEl = document.getElementById("note-title");
const noteBodyEl = document.getElementById("note-body");
const deleteNoteEl = document.getElementById("delete-note");
const updatedDateEl = document.getElementById("last-updated");

const noteId = location.hash.substring(1);

initializeEditPage(noteId);

noteTitleEl.addEventListener("input", e => {
    const note = updateNote(noteId, {
        title: e.target.value
    });
    updatedDateEl.textContent = generateLastUpdated(note.updatedAt);
});

noteBodyEl.addEventListener("input", e => {
    const note = updateNote(noteId, {
        body: e.target.value
    });
    updatedDateEl.textContent = generateLastUpdated(note.updatedAt);
});

deleteNoteEl.addEventListener("click", e => {
    removeNote(noteId);
    location.assign("/index.html");
});

window.addEventListener("storage", e => {
    if (e.key === "notes") {
        initializeEditPage(noteId);
    }
});
