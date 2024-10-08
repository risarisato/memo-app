import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

// Appクラスを定義する、コンストラクタにrootを渡す
export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        // 第1引数にroot、第2引数にthisハンドラを渡す
        this.view = new NotesView(root, this._handlers());

        // ストレージからノートをリフレッシュする
        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();
        console.log(notes);

        // ストレージの中にあるノートをセットする
        this._setNotes(notes);

        // ノートが1つでもあれば、最初のノートをアクティブ化
        if(notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    // ノートをセットする
    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
    }

    // ノートをアクティブ化(ハイライト)
    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers() {
        return {
            onNoteSelect: (noteId) => {
                console.log(noteId + "ノートが選択されました。");
            },
            onNoteAdd: () => {
                console.log("ノートが追加されました。");
            },
            onNoteEdit: (title, body) => {
                console.log(title);
                console.log(body);
            },
            onNoteDelete: (noteId) => {
                console.log(noteId + "ノートが削除されました。");
            },
        };
    }
}