import NotesAPI from "./NotesAPI.js" ;
import NotesView from "./NotesView.js";

//NotesAPI.saveNotes({
//    id: 123,
//    title: 'aaハードコーディングの記述',
//    body: 'aaメモアプリのハードコーディングの記述をしています。',
//});

const app = document.getElementById("app");
const view = new NotesView(app, {
    onNoteSelect() {
        console.log('onNoteSelect');
    },
});

console.log(NotesAPI.getAllNotes());
//deleteNote(123);
//deleteNote(133494);