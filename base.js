var request = require('request');

var optionParams = {
    q:"저라뎃",
    part:"snippet",
    key:"AIzaSyCgGa6aM7taXs4bajtYukbc_EQAKTLVTNc",
    type:"video",
    maxResult2:5,
    regionCode:"KR",
    videoDuration:"short"
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

