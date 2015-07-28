// 以下のリクエストを送信する
// http://api.ekispert.jp/v1/json/station?key=◯◯&name=高円寺

$.ajax({
  type: 'GET',
  url: 'http://api.ekispert.jp/v1/json/station',
  data: {
  key: '講義内でお伝えします'
  },
  dataType: 'json',
})
// 正常レスポンスの場合、こちらのフローに流れる
.done(function(data) {

  // サイト上にレスポンスの中身を表示させる
  $(function(){
    // ResultSet要素の中のPoint要素の一番目の中のStation要素の中のNameを取ってくる
    var name = data.ResultSet.Point[0].Station.Name;

    // ページに表示する
    $("#show_name").text('駅名：' + name);
  });

  // 開発ツールのコンソール上にレスポンス内容を表示する
  console.log(data);
})
// エラーレスポンスの場合、こちらのフローに流れる
.fail(function(XHR, textStatus, errorThrown) {
  // ダイアログが表示される
  alert(errorThrown);
});
