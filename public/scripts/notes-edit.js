const noteId = window.location.hash.substring(1);
const notes = getSavedNotes();
const note = notes.find(note => note.id === noteId);

const noteTitleEl = document.getElementById("note-title");
const noteBodyEl = document.getElementById("note-body");
const deleteNoteEl = document.getElementById("delete-note");
const updatedDateEl = document.getElementById("last-updated");

if (!note) {
    location.assign("/index.html");
}

noteTitleEl.value = note.title;
noteBodyEl.value = note.body;
updatedDateEl.textContent = generateLastUpdated(note.updatedAt);

noteTitleEl.addEventListener("input", function() {
    note.title = noteTitleEl.value;
    note.updatedAt = moment().valueOf();
    updatedDateEl.textContent = generateLastUpdated(note.updatedAt);
    saveNotes(notes);
});

noteBodyEl.addEventListener("input", function() {
    note.body = noteBodyEl.value;
    note.updatedAt = moment().valueOf();
    updatedDateEl.textContent = generateLastUpdated(note.updatedAt);
    saveNotes(notes);
});

deleteNoteEl.addEventListener("click", function() {
    removeNote(note.id);
    saveNotes(notes);
    location.assign("/index.html");
});

window.addEventListener("storage", e => {
    if (e.key === "notes") {
        const updatedNotes = JSON.parse(e.newValue);
        const updatedNote = updatedNotes.find(note => note.id === noteId);

        if (!note) {
            location.assign("/index.html");
        }

        noteTitleEl.value = updatedNote.title;
        noteBodyEl.value = updatedNote.body;
        updatedDateEl.textContent = generateLastUpdated(updatedNote.updatedAt);
    }
});
