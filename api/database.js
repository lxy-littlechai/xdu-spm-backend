// database.js
// 连接Mysql

let mysql = require('mysql2');
// 数据库连接配置
/* host: '1.14.66.64',    // 数据库的地址
  user: 'spm',         // 数据库用户名
  password: 'root',     // 数据库密码
  database: 'spm'   // 数据库名称    */
let pool = mysql.createPool({
  host: 'localhost',    // 数据库的地址
  user: 'root',         // 数据库用户名
  password: '123456',     // 数据库密码
  database: 'spm'   // 数据库名称   
})

// 对数据库进行增删改查操作的基础
function query(sql, callback) {
  console.log(sql)
  pool.getConnection((err, connection) => {
    connection.query(sql, (err, rows) => {

      callback(err, rows)
      connection.release()
    })
  })
}

exports.query = query
