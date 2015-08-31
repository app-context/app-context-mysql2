# app-context-mysql

[mysql](https://www.npmjs.com/package/mysql) initializer for [app-context](https://www.npmjs.com/package/app-context)

## Usage

This initializer can be auto-installed by using it in your context file.

This initializer will attach the configured connections to `APP.mysql`.

```javascript
module.exports = function() {
  this.runlevel('connected')
    // attach a connection to APP.mysql - use the value at APP.config.mysql as the connection string
    .use('mysql', '$mysql')

    // attach a connection to APP.mysql
    .use('mysql', 'mysql://localhost:3306/foobar')

    // attach a connection pool to APP.mysql
    .use('mysql', {url: 'mysql://localhost:3306/foobar', pool: true})

    // create 2 connections and attach them as an object to APP.mysql
    // this will create APP.mysql.users and APP.mysql.data
    .use('mysql', {
      users: '$mysql.users',
      data: '$mysql.data'
    })

    // you can also pass options to each connection
    .use('mysql', {
      users: {url: 'mysql://localhost:3306/users', pool: true},
      data: {url: 'mysql://localhost:3306/data', connectTimeout: 3000}
    })
};
```

## Connection Configurations

Each connection can be configured with either a connection string (like `mysql://localhost:3306/users`) or
with an object. The object will be passed through to the mysql constructor and can consist of any options
from [connection options](https://www.npmjs.com/package/mysql#connection-options). There is a special `url` option not listed that this initializer will parse and fill in for you (like the user, password, host, and port).

### Connection Pooling

You can make any connection a pool by adding `{pool: true}` to the configuration. Other options from the
configuration will be passed through to the mysql driver. You can see the available options at [connection options](https://www.npmjs.com/package/mysql#connection-options) and [pool options](https://www.npmjs.com/package/mysql#pool-options).
