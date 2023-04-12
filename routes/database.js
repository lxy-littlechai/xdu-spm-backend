// database.js
// 连接Mysql

let mysql = require('mysql2');
// 数据库连接配置
let pool = mysql.createPool({
  host: '1.14.66.64',    // 数据库的地址
  user: 'root',         // 数据库用户名
  password: 'root',     // 数据库密码
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
