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

    // 指定したノートをアクティブ化(ハイライト)
    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers() {
        return {
            onNoteSelect: (noteId) => {
                console.log(noteId + "ノートが選択されました。");
                const selectedNote = this.notes.find((note) => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                console.log("ノートが追加されました。");
                const newNote = {
                    title: "新しいメモ課題",
                    body: "メモの内容",
                };

                NotesAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
              console.log("ノートが編集されました。");

              NotesAPI.saveNote({
                id: this.activeNote.id,
                title: title,
                body: body,
              });

              this._refreshNotes();
            },
            onNoteDelete: (noteId) => {
                console.log(noteId + "ノートが削除されました。");
            },
        };
    }
}