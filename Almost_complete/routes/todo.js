
/*
 * GET todo
 */

var fs = require('fs');	// 파일 시스템 모듈
var request = require('request');

exports.list = function(req, res){	// ToDo 목록 가져오기
	fs.exists('./todo_list.json', function (exists) {	// ToDo 목록 존재 확인
		if(exists) {
			fs.readFile('./todo_list.json', {
				'encoding': 'utf8'
			}, function (err, list) {	// todo_list.json 파일 읽기
				res.json(list);
			});
		} else {
			var list = {	// 기본 ToDo 목록 형식
				'list': []
			};
				
			fs.writeFile('./todo_list.json', JSON.stringify(list), function (err) {	// todo_list.json 파일 쓰기
				res.json(list);
			});
		}
	});
};




exports.add = function(req, res1){	// 새로운 ToDo 항목 추가하기

	//유튜브 api 이용 검색부분

	console.log(req.body);
	var optionParams = {
		q:req.body.contents,
		part:"snippet",
		key:"AIzaSyCTR9nHa9PheDMJO9O91Oj8HRJcu81bP_M",
		type:"video",
		maxResults: Number(req.body.counts),
		regionCode:"KR",
		order:"viewCount"
	};


	console.log("'");
	console.log("`");
	optionParams.q = encodeURI(optionParams.q);

	var url="https://www.googleapis.com/youtube/v3/search?";
	for(var option in optionParams){
		url+=option+"="+optionParams[option]+"&";
	}
	
	//url의마지막에 붙어있는 & 정리
	url=url.substr(0, url.length-1);
	var data;
	request(url, function(err, res, body){
		// console.log(body)
		
		//json형식을 서버로 부터 받음
		data2=JSON.parse(body).items;
		fs.readFile('./todo_list.json',{
			'encoding':'utf8'
		},function(err,data){
			data= JSON.parse(data);
			data.list=[];
			for (var content in data2){
				var todo = {	// 기본 ToDo 항목 형식
					'contents': '',
					'videoId':'',
					'complete': false
				};
				var a=data2[content].snippet.title;
				console.log(a+" : "+data2[content].id.videoId);
				todo.contents = a;
				todo.videoId = data2[content].id.videoId;
				data.list.push(todo);
				fs.writeFile('./todo_list.json',JSON.stringify(data),function(err){
					res1.json(true);
				});				
			}
		});
	});

	//todo.contents = req.body.contents;
/*
	fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);
		
		for (var i=0;i<5;i++)
		{
			data.list.push(VideoIds[i]);
		}
			// 새로운 ToDo 항목 추가
		
		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});*/
};

exports.complete = function(req, res){	// 선택한 ToDo 항목 완료하기
	fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);
		
		data.list[req.body.index].complete = true;
		var fs = require('fs');
		var youtubedl = require('youtube-dl');
		var video = youtubedl('http://www.youtube.com/watch?v='+data.list[req.body.index].videoId);
		video.on('info',function(info)
		{
			console.log('Download started');
			console.log('filename : '+ info.filename);
			console.log('size : '+info.size);
		});
		var a= data.list[req.body.index].contents
		var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
		a=a.replace(regExp,"");
		video.pipe(fs.createWriteStream(a+'.mp4'));
		console.log(data.list[req.body.index].contents);
		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
		return;
	});
};

exports.del = function(req, res){	// 선택한 ToDo 항목 삭제하기
	fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);
		
		data.list[req.body.index] = null;	// 선택한 ToDo 항목 삭제
		data.list = data.list.filter(Boolean);	// 유효한 값 추려내기
		
		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});
};