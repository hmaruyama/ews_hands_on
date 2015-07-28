$.ajax({
  type: 'GET',
  url: 'http://api.ekispert.jp/v1/json/search/course/extreme',
  data: {
  key: '講義内でお伝えします',
  // 問題 経路を変えてみて、/course/stationのリクエスト数の変化を見てみてください。
  viaList: '高円寺:池袋'
  },
  dataType: 'json',
})
.done(function(data) {

  $(function(){
    var stations = [];
    var lines = [];
    var course_stations = [];
    var line, station;
    var route = data.ResultSet.Course[0].Route;

    stations[0] = route.Point[0].Station.Name
    station = $('<p>' + stations[0] + '</p>');
    $("#course").append(station);

    for(var i = 0; i < route.Point.length - 1; i++) {
      stations[i + 1] = route.Point[i + 1].Station.Name;
      if (route.Line instanceof Array) {
        lines[i] = route.Line[i].Name;
      } else {
        lines[i] = route.Line.Name;
      }

      $.ajax({
        type: 'GET',
        url: 'http://api.ekispert.jp/v1/json/course/station',
        data: {
          key: 'wC4SR9ETBhBcJ3Bv',
          sectionIndex: i + 1,
          serializeData: data.ResultSet.Course[0].SerializeData
        },
        dataType: 'json',
        async: false
      })
      .done(function(data) {
        course_stations = [];

        if (data.ResultSet.Point) {
          for(var j = 0; j < data.ResultSet.Point.length; j++) {
            course_stations[j] = data.ResultSet.Point[j].Station.Name;
          };
        }

        if (course_stations.length > 0) {
          course_station = $('<p>↓ 停車駅：' + course_stations + '</p>');
          $("#course").append(course_station);
        }
        line = $('<p>↓ ' + lines[i] + '</p>');
        $("#course").append(line);
        station = $('<p>' + stations[i + 1] + '</p>');
        $("#course").append(station);
      })
    }
  });

  console.log(data);
})
.fail(function(XHR, textStatus, errorThrown) {
  alert(errorThrown);
});
