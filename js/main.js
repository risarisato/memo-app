import App from "./App.js";
import NotesAPI from "./NotesAPI.js" ;
import NotesView from "./NotesView.js";


// DOM要素の全体を取得する
const root = document.getElementById("app");
// Appクラスのインスタンスを生成する
const app = new App(root);
