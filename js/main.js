import NotesAPI from "./NotesAPI.js" ;
import NotesView from "./NotesView.js";

//NotesAPI.saveNotes({
//    id: 123,
//    title: 'aaハードコーディングの記述',
//    body: 'aaメモアプリのハードコーディングの記述をしています。',
//});

// クライアント側で呼び出している

// HTMLのDOM要素の「app」は、date-note-idは、datasetでidを取得できる
const app = document.getElementById("app");
// NotesViewクラスのコンスタラクタされたインスタンスを生成する
const view = new NotesView(app, {
    onNoteSelect(id) {
        console.log(id + 'のノートが選択されれた');
    },
    onNoteAdd() {
        console.log('ノートが追加された');
    },
    onNoteEdit(newTitle, newBody) {
        console.log(newTitle);
        console.log(newBody);
    },
    onNoteDelete(id) {
        console.log(id + 'のノートが削除された');
    },
});

console.log(NotesAPI.getAllNotes());
//deleteNote(123);
//deleteNote(133494);

// 左サイドバーのクライアントで側_createListItemHTMLをnotesListで呼び出す
const notes = NotesAPI.getAllNotes();
view.updateNoteList(notes);

// プレビューにメモのタイトルと内容を表示する
view.updateActiveNote(notes[0]);