$.ajax({
  type: 'GET',
  url: 'http://api.ekispert.jp/v1/json/station',
  data: {
  key: '講義内でお伝えします',
  name: '高円寺'
  },
  dataType: 'json',
})
.done(function(data) {

  $(function(){
    var name = data.ResultSet.Point[0].Station.Name;

    // 問題 上と同じPoint[0]の要素内の都道府県名を取得してください。
    var prefecture_name = 'ここに答えを入れる';

    $("#show_station_name").text('駅名：' + name);
    $("#show_prefecture_name").text('都道府県名：' + prefecture_name);
  });

  console.log(data);
})
.fail(function(XHR, textStatus, errorThrown) {
  alert(errorThrown);
});
