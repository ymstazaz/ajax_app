// 手打ちで作成
// 連動チェックにはconsole.log("イベント発火");を活用。都度削除する
// JSはレイルズSじゃなくてグーグル画面の更新が必須！
const buildHTML = (XHR) => {
// 上に持ってくる時に関数ビルドHTMLとして定義する。その際にこの括りの最後にリターンHTMLをつける
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

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
    XHR.onload = () => {
      // リクエストに成功したらオンロード
      if (XHR.status != 200) {
        // HTTPステータスコードで成功（200）したら下記内容を表示して、だめだった時はエラー分がポップアップされる（エラー分の設定はしなくても勝手にでる）
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
        // console.log(XHR.response);  ←内容確認のためのやつ
      // レスポンス内容はresponseプロパティに自動で入ってるからこれを表示してでOK。
      // コンソールでpostってでてたらおk
      // 表示してほしい新しい投稿のフォーマット。新しい投稿は変数アイテムに格納して使用！
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      // HTMLの情報はビルドHTMLでそのままごそっと上にあげてしまう。上で定義つけしたのをここに代入する↓
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      // afterbeginは要素内部の最初の子要素の直前を指す。これはそのほかも指定可能な文字列が決まってる
      // に上のリストをいれこんでね！
      formText.value = "";
      // フォームのテキストのところを投稿するボタンを押したら消えるように設定
    };
  });
};

window.addEventListener('turbo:load', post);
// addEventListener→何かした時にその動作を聞き耳立てるメソッド
// 'turbo:load'はイベントに種類。ページの表示が完了したよと教えてくれる合図
// ポストはフィクションのポストと同じ。上のイベントが発生したらポストしてね