// 以下のリクエストを送信する
// http://api.ekispert.jp/v1/json/search/course/extreme?key=◯◯&viaList=高円寺:池袋

$.ajax({
  type: 'GET',
  url: 'http://api.ekispert.jp/v1/json/search/course/extreme',
  data: {
  key: '講義内でお伝えします',
  viaList: '高円寺:池袋'
  },
  dataType: 'json',
})
// 正常レスポンスの場合、こちらのフローに流れる
.done(function(data) {

  $(function(){
    var stations = [];
    var lines = [];
    var line, station;
    // レスポンスの一番目の経路を使用する
    var route = data.ResultSet.Course[0].Route;

    // 一番目の駅名を取ってくる
    stations[0] = route.Point[0].Station.Name;

    // 一番目の駅名を表示する
    station = $('<p>' + stations[0] + '</p>');
    $("#course").append(station);

    // 駅名の数だけ、繰り返し処理を行う
    for(var i = 0; i < route.Point.length - 1; i++) {
      // 二番目以降の駅名を取ってくる
      stations[i + 1] = route.Point[i + 1].Station.Name;
      if (route.Line instanceof Array) {
        // 路線名を取ってくる
        lines[i] = route.Line[i].Name;
      } else {
        lines[i] = route.Line.Name;
      }
      // 一番目以降の路線名と、二番目以降の駅名を交互に表示する
      line = $('<p>↓ ' + lines[i] + '</p>');
      station = $('<p>' + stations[i + 1] + '</p>');
      $("#course").append(line);
      $("#course").append(station);
    }
  });

  // 開発ツールのコンソール上にレスポンス内容を表示する
  console.log(data);
})
// エラーレスポンスの場合、こちらのフローに流れる
.fail(function(XHR, textStatus, errorThrown) {
  alert(errorThrown);
});
