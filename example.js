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
