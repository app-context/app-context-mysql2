module.exports = function(config) {
  var isSingle = false;
  if (typeof(config) === 'string' || config.url) {
    config = {default: config};
    isSingle = true;
  }

  var Promise = require('bluebird');
  var builder = require('mysql-builder')(require('mysql'));

  var connect = function(opts) {
    return new Promise(function(resolve, reject) {
      var url;
      if (typeof(opts) === 'string') {
        url = opts;
        opts = {};
      } else {
        url = opts.url;
        delete opts.url;
      }

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
  };

  return function(context) {
    var connections = {};

    return Promise.all(
      Object.keys(config).map(function(k) {
        return connect(config[k]).then(function(conn) {
          connections[k] = conn;
        });
      })
    ).then(function() {
      if (isSingle) {
        context.mysql = connections.default;
      } else {
        context.mysql = connections;
      }
    });
  };
};
