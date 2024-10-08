// NotesViewクラスを定義して、コンストラクタでDOM要素を取得して、HTML要素を追加する
export default class NotesView {
    constructor(
        // この「HTML_DOM_element」は、HTML要素を指す
        root,
        { onNoteSelect,
          onNoteAdd,
          onNoteEdit,
          onNoteDelete } = {}
    ) {
        // この「this」は、自分自身の「クラスNotesView」のインスタンスクラスを指す
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;

        // HTHLにあった記述をJSにしてDOM要素して動的に表示する
        this.root.innerHTML = `
        <!-- ノートサイドバー -->
        <div class="nodesSidebar">
          <button class="notesAdd" type="button">ノートの追加</button>
          <div class="notesList">
            <div class="notesList-item">

            </div>
          </div>
        </div>
        <!-- ノートプレビュー -->
        <div class="notesPreview">
          <input type="text" class="notesTitle" placeholder="タイトルを入力" />
          <textarea class="notesBody" placeholder="本文を追加"></textarea>
        </div>
        `;

        // ノートの追加ボタンを取得する
        // <button class="notesAdd" type="button">ノートの追加</button>を取得している
        const btnAddNote = this.root.querySelector(".notesAdd");
        // ノートの追加ボタンをクリックしたときのEventListener処理を追加する
        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });
        // タイトルと内容を更新したときの処理を追加する
        const inputTitle = this.root.querySelector(".notesTitle");
        const inputBody = this.root.querySelector(".notesBody");

        [inputTitle, inputBody].forEach((inputField) => {
            inputField.addEventListener("blur", () => {
              const updatedTitle = inputTitle.value.trim();
              const updatedBody = inputBody.value.trim();

              // 更新処理を呼び出す
              this.onNoteEdit(updatedTitle, updatedBody);
        });
     });
  }

  // ストレージに保存したメモをサイドバーに出力取得する
  // NotesView.js内でしか使わない_プライベートメソッド
  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 80;

    // メモのタイトル、内容、更新日時を表示する
    // date-note-idは、datasetで取得できる
    return `
      <div class="notesList-item" data-note-id=${id}>
        <div class="notesSmall-title">
          ${title}
        </div>
        <div class="notesSmall-body">
          ${body.substring(0, MAX_BODY_LENGTH)}
          ${body.length > MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div class="notesSmall-updated">
          ${updated.toLocaleString()}
        </div>
      </div>
      `;
  }

  //  _createListItemHTMLプライベートメソッドで実際に左サイドバーに出力する
  updateNoteList(notes) {
    const notesListContainer = this.root.querySelector(".notesList");

    // 中身がある状態で呼び出すと、前回メモ増えるため
    // 空にしてから呼び出す＝「innerHTML」メモの中身をクリアする
    notesListContainer.innerHTML = "";

    // メモのリストを拡張for文で表示する
    for(const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );

      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    // メモの選択 date-note-idは、datasetで取得できる
    notesListContainer
      .querySelectorAll(".notesList-item")
      .forEach((noteListItem) => {
        noteListItem.addEventListener("click", () => {
          //console.log("ノートが選択された");
          //console.log(noteListItem.dataset);
          this.onNoteSelect(noteListItem.dataset.noteId);
        });

        // メモの削除
        noteListItem.addEventListener("dblclick", () => {
          const doDelete = confirm("このノートを削除しますか？");

          if (doDelete) {
            this.onNoteDelete(noteListItem.dataset.noteId);
          }
        });
      });
  }

  // メモのタイトルと内容を表示する
  updateActiveNote(note) {
    this.root.querySelector(".notesTitle").value = note.title;
    this.root.querySelector(".notesBody").value = note.body;

    // 選択しているメモのハイライトを解除する
    this.root
      .querySelectorAll(".notesList-item")
      .forEach((noteListItem) => {
        noteListItem.classList.remove("notesList-item--selected");
      });

    // 選択しているメモをハイライトする
    this.root
      .querySelector(`.notesList-item[data-note-id="${note.id}"]`)
      .classList.add("notesList-item--selected");
  }
}