var Promise = require('bluebird');
var builder = require('mysql-builder')(require('mysql'));
var createConnections = require('@mattinsler/app-context-create-connections');

module.exports = createConnections('mysql', function(url, opts) {
  return new Promise(function(resolve, reject) {
    if (opts.pool) {
      delete opts.pool;

      var pool = builder.pool(url, opts);
      pool.getConnection(function(err, conn) {
        if (err) { return reject(err); }
        conn.release();
        resolve(pool);
      });
    } else {
      var conn = builder(url, opts);
      conn.connect(function(err) {
        if (err) { return reject(err); }
        resolve(conn);
      });
    }
  });
});
