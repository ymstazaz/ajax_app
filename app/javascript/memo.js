// 手打ちで作成
// 連動チェックにはconsole.log("イベント発火");を活用。都度削除する
function post (){
  // console.log("イベント発火");
// 連動してたらイベント発火とでるように設定。確認できたら削除
  const form = document.getElementById("form");
  // インデックスのフォームを装飾する
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  // 投稿されたことを認識する、その中でも投稿（送信）というイベントを認識するために第一引数はサブミットを選択
  // eはイベントオブジェクトといい、イベント発生時の情報を持ったオブジェクト。今回は送信ボタンをクリックしたという情報を持ったオブジェクト
  // それをしたのpreventDefault();で無効化にしてる。
    const formData = new FormData(form);
    // 引数にフォーム要素を渡すことで、そのフォームに入力された値を取得
    const XHR = new XMLHttpRequest();
    // サーバーサイドにリクエストを送信するのに必要なXHRオブジェクトを作成。
    XHR.open("POST", "/posts", true);
    // リクエストの内容を指定するためのメソッド（open）
    // HTTPメソッドのPOSTを指定、パスの指定、非同期通信が正しいためTRUE（同期通信にするならファルス）
    XHR.responseType = "json";
    // レスポンスするデータフォーマットを指定（ジャバスクリプトではJSONを使うことが多い）
    XHR.send(formData);
    // リクエストを送信するメソッド。フォームに入力された内容をサーバー側におくるから、フォームデータ
  });
};

window.addEventListener('turbo:load', post);
// addEventListener→何かした時にその動作を聞き耳立てるメソッド
// 'turbo:load'はイベントに種類。ページの表示が完了したよと教えてくれる合図
// ポストはフィクションのポストと同じ。上のイベントが発生したらポストしてね