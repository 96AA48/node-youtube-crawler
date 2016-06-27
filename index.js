var http = require('https');
var cheerio = require('cheerio');

var searchLink = 'https://www.youtube.com/results?search_query=';

module.exports = function (query, fn) {
  try {
    http.get(searchLink + query, function (res) {
      var _data = '';
      var found = [];

      res.on('data', function (data) {
        _data += data;
      });

      res.on('end', function () {
        var $ = cheerio.load(_data);
        var videos = $('.yt-lockup-video');

        for (i = 0; i < videos.length; i++) {
          var link = $(videos[i]).find('.yt-uix-sessionlink').attr('href');
          if (!link.startsWith('/watch')) continue;
          found.push({
            title: $(videos[i]).find('.yt-lockup-title a').text(),
            link: 'https://youtube.com' + link
          });
        }

        fn(null, found);
      });
    });
  }
  catch (err) {fn(err);}
}
