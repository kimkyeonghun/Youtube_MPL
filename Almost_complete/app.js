
/**
 * Module dependencies.
 */

// 모듈 가져오기
var express = require('express')
  , main = require('./routes/index')
  , todo = require('./routes/todo')
  , login =require('./routes/login')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express();	// 어플리케이션 생성
var port = 3000;		// 어플리케이션 포트
var request = require('request');

// 어플리케이션 설정
app.configure(function(){
  app.set('port', port);					// 웹 서버 포트
  app.set('views', __dirname + '/views');	// 템플릿
  app.set('view engine', 'ejs');			// 템플릿 엔진
  app.use(express.favicon());				// 파비콘
  app.use(express.logger('dev'));			// 로그 기록
  app.use(express.bodyParser());			// 요청 본문 파싱
  app.use(express.methodOverride());		// 구식 브라우저 메소드 지원
  app.use(app.router);						// 라우팅
	
  // 정적 리소스 처리
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){	// 개발 버전
  app.use(express.errorHandler());			// 에러 메세지
});

// 라우팅
app.get('/Vlist',function(req,res){
  fs.readFile('./views/index.ejs',function(error,data){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
    return;
  })
});
app.get('/',function(req,res){
  fs.readFile('./views/login.html/',function(error,data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
    return;
  })
});
app.get('/signup',function(req,res){
  fs.readFile('./views/signup.html',function(error,data){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  })
})
app.get('/LogInForm',login.LogInForm);
app.post('/SignUpForm',login.SignUpForm);
app.get('/list', todo.list);
app.post('/add', todo.add);
app.post('/complete', todo.complete);
app.post('/del', todo.del);

// 서버 실행
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
