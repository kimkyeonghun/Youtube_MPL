
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '나만의 YOUTUBE 리스트' });
};