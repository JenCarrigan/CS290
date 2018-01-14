var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_carrigaj',
  password        : '0176',
  database        : 'cs290_carrigaj'
});

module.exports.pool = pool;
