var request = require('request');

var optionParams = {
    q:"kakao",
    part:"snippet",
    key:"AIzaSyCgGa6aM7taXs4bajtYukbc_EQAKTLVTNc",
    maxResult2:5
};
var url = "https://www.googleapis.com/youtube/v3/search?";
for (var option in optionParams)
{
    url+=option+"="+optionParams[option]+"&";
}

url = url.substr(0,url.length-1);

request(url, function(err,res,body){
    console.log(body)
});