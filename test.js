var crawler = require('./index');

crawler('Kinda neat', function (err, results) {
  if (err) console.warn(err);
  console.dir(results);
});
