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

  // サイト上にレスポンスの中身を表示させる
  $(function(){
    var stations = [];
    var lines = [];
    var line, station;
    var route = data.ResultSet.Course[0].Route;

    stations[0] = route.Point[0].Station.Name;
    station = $('<p>' + stations[0] + '</p>');
    $("#course").append(station);

    for(var i = 0; i < route.Point.length - 1; i++) {
      stations[i + 1] = route.Point[i + 1].Station.Name;
      if (route.Line instanceof Array) {
        lines[i] = route.Line[i].Name;
      } else {
        lines[i] = route.Line.Name;
      }
      line = $('<p>| ' + lines[i] + '</p>');
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
