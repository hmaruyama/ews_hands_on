$.ajax({
  type: 'GET',
  url: 'http://api.ekispert.jp/v1/json/station',
  data: {
  key: '講義内でお伝えします',
  // 問題 パラメータを色々変更してみてください。
  name: '高円寺'
  },
  dataType: 'json',
})
.done(function(data) {

  $(function(){
    var name = [];
    if (data.ResultSet.Point instanceof Array) {
      for (var i = 0; i < data.ResultSet.Point.length; i++) {
        name[i] = data.ResultSet.Point[i].Station.Name;
      };
    } else {
      name[0] = data.ResultSet.Point.Station.Name;
    }
    $("#show_name").text('駅名：' + name);
  });

  console.log(data);
})
.fail(function(XHR, textStatus, errorThrown) {
  alert(errorThrown);
});
