// NotesViewクラスを定義して、コンストラクタでDOM要素を取得して、HTML要素を追加する
export default class NotesView {
    constructor(
        // この「root」は、HTML要素を指す
        HTML_DOM_element,
        { onNoteSelect,
          onNoteAdd,
          onNoteEdit,
          onNoteDelete } = {} 
    ) {
        // この「this」は、自分自身の「クラスNotesView」のインスタンスクラスを指す
        this.root = HTML_DOM_element;
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
              <div class="notesSmall-title">Javascriptの勉強</div>
              <div class="notesSmall-body">vanillaスクリプトで勉強</div>
              <div class="notesSmall-updated">2024/09/29</div>
            </div>
          </div>
        </div>
        <!-- ノートプレビュー -->
        <div class="notesPreview">
          <input type="text" class="notesTitle" placeholder="タイトルを入力" />
          <textarea class="notesBody" placeholder="本文を追加"></textarea>
        </div>
        `;
    }
}