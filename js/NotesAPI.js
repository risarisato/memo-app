// バックエンドのAPIを(DBで無く)ローカルストレージを使って保存する
export default class NotesAPI {
    // ローカルストレージに保存したすべてのノートを取得する
    // staticをつけると、インスタンスを生成せずに呼び出せる
    static getAllNotes() {
        // Jsonのstringifyシリアライズしたものを解析で
        //「parse」で文字列をJSON形式に変換できるからデータを取得できる
        const notes = JSON.parse(localStorage.getItem('notes') || "[]");
        return notes;
    }


    // メモを保存するAPI
    static saveNote(noteToSave) {
        // ローカルストレージに保存したすべてのノートを取得する
        const notes = NotesAPI.getAllNotes();

        // メモの存在を確認する
        const existingNote = notes.find((note) => note.id === noteToSave.id);

        // メモが存在する場合は更新する
        if (existingNote) {
            existingNote.title = noteToSave.title;
            existingNote.body = noteToSave.body;
            existingNote.updated = new Date().toISOString();
        } else {
            // メモのIDを生成する
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            // メモを追加する
            notes.push(noteToSave);
        }
        // ローカルストレージに保存する
        // 「stringify」でJSON形式を文字列に変換して
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // メモを削除するAPI
    static deleteNote(id) {
        // ローカルストレージに保存したすべてのノートを取得する
        const notes = NotesAPI.getAllNotes();

        // filter関数で削除するメモの存在を確認する
        const newNotes = notes.filter((note) => note.id != id);

        // 削除したメモをローカルストレージに保存する
        localStorage.setItem('notes', JSON.stringify(newNotes));
    }
}

