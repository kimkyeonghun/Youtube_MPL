
/*
 * GET home page.
 */
var fs=require("fs");

exports.index = function(req, res){
  var data={
    'API' : req.query.API
  }
  fs.writeFile('./API_Key.json', JSON.stringify(data), function (err) {	// todo_list.json 파일 쓰기
    res.json(data);
    return;
  });
  res.render('index', { title: '나만의 YOUTUBE 리스트' });
  return;
};
