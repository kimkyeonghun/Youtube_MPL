var fs = require('fs');	
var request = require('request');

exports.LogInForm=function(req,res){
  fs.exists('./user_list.json', function (exists) {	// ToDo 목록 존재 확인
		if(exists) {
			fs.readFile('./user_list.json', {
				'encoding': 'utf8'
			}, function (err, list) {
				console.log(list);
				res.json(list);
			});
		} else {
			var list = {	// 기본 ToDo 목록 형식
				'list': []
			};
				
			fs.writeFile('./user_list.json', JSON.stringify(list), function (err) {	// todo_list.json 파일 쓰기
				res.json(list);
			});
		}
	});
};

exports.SignUpForm=function(req,res){
	fs.readFile('./user_list.json',{
		'encoding':'utf-8'
	},function(err,data){
		data=JSON.parse(data);
		var Info={
			'fname': req.body.fname,
			'userId': req.body.userId,
			'API':req.body.API,
			'password' : req.body.password,
		}
		data.list.push(Info);
		fs.writeFile('./user_list.json',JSON.stringify(data),function(err){
			res.json(true);
		});
	}
	)
}