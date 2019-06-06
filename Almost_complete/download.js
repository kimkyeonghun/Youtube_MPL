/*var request = require('request');
var optionParams = {
    q:"염따",
    part:"snippet",
    key:"AIzaSyCgGa6aM7taXs4bajtYukbc_EQAKTLVTNc",
    type:"video",
    maxResult:2,
    regionCode:"KR",
    order:"viewCount"
};
optionParams.q = encodeURI(optionParams.q);
var url = "https://www.googleapis.com/youtube/v3/search?";
for (var option in optionParams)
{
    url+=option+"="+optionParams[option]+"&";
}
url = url.substr(0,url.length-1);
var VideoIds = new Array();
var idx = 0;
request(url, function(err,res,body){
    //console.log(body)
    var data = JSON.parse(body).items;
    for(var content in data)
    {
        VideoIds[idx]=(data[content].id.videoId);
        idx++;
    }
    console.log(VideoIds.length);
    console.log(VideoIds[0]);
    console.log(typeof(VideoIds[1]));
    //다운로드 부분
    var fs = require('fs');
    var youtubedl = require('youtube-dl');
    var video = youtubedl('http://www.youtube.com/watch?v='.concat(VideoIds[1]));
    video.on('info',function(info)
    {
        console.log('Download started');
        console.log('filename : '+ info.filename);
        console.log('size : '+info.size);
    });
    video.pipe(fs.createWriteStream('justlikethat.mp4'));
});
*/

var request=require('request');
var optionParams={
	q:"코코몽",
	part:"snippet",
	key:"AIzaSyCgGa6aM7taXs4bajtYukbc_EQAKTLVTNc",
	type:"video",
	maxResults:10,
	regionCode:"KR",
	order:"viewCount"
 };

//한글을 검색어로 전달하기 위해선 url encoding 필요!
optionParams.q=encodeURI(optionParams.q);

var url="https://www.googleapis.com/youtube/v3/search?";
for(var option in optionParams){
	url+=option+"="+optionParams[option]+"&";
}

//url의마지막에 붙어있는 & 정리
url=url.substr(0, url.length-1);

request(url, function(err, res, body){
	// console.log(body)
	
	//json형식을 서버로 부터 받음
	var data=JSON.parse(body).items;
	for(var content in data){
		
		//youtube downloader에 videoId 넘기면 됨.
		console.log(data[content].snippet.title+" : "+data[content].id.videoId);
		
	}
});