$.ajax({
  type: 'GET',
  url: 'http://api.ekispert.jp/v1/json/station',
  data: {
  key: '講義内でお伝えします',
  name: '高円寺'
  },
  dataType: 'json',
})
// 正常レスポンスの場合、こちらのフローに流れる
.done(function(data) {

  // サイト上にレスポンスの中身を表示させる
  $(function(){
    // 表示させたい要素
    var name = data.ResultSet.Point[0].Station.Name;
    var code = data.ResultSet.Point[0].Station.code;
    var yomi = data.ResultSet.Point[0].Station.Yomi;

    $("#show_name").text('駅名：' + name);
    $("#show_code").text('コード：' + code);
    $("#show_yomi").text('よみ：' + yomi);
  });

  // 開発ツールのコンソール上にレスポンス内容を表示する
  console.log(data);
})
// エラーレスポンスの場合、こちらのフローに流れる
.fail(function(XHR, textStatus, errorThrown) {
  alert(errorThrown);
});
