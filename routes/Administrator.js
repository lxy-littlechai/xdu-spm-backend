var express = require('express');
var router = express.Router();

// 引入数据库配置文件
const db = require('./database')

// 查找用户
router.post('/GetAccount', (req, res) => {
  const data = req.body;
  console.log(data)

  let sql = `select * from user where permission != "Administrator"`;
  const op = `and username = "${data.username}"`;

  if (data.username != "") {
    sql += op;
  }

  db.query(sql, (err, result) => {

    const date = String(new Date()).slice(0, 24);
    sql = `insert into log values(
      0, "Administrator", "${data.activeUser}", "GetAccount", "${err ? err : data.username}", "${date}"
    )`
    db.query(sql, (err, result) => { });

    if (err) {
      console.log(err)
      res.json({
        status: "500",
        success: false
      });
      return;
    }
    res.json({
      status: "200",
      success: true,
      result
    });

  });


})

// 创建用户
router.post('/CreateAccount', (req, res) => {
  const data = req.body;
  console.log(data)

  let sql = `insert into user values(
    "${data.username}","${data.password}","${data.permission}"
    )`;
  db.query(sql, (err, result) => {

    const date = String(new Date()).slice(0, 24);
    sql = `insert into log values(
      0, "Administrator", "${data.activeUser}", "CreateAccount", "${err ? err : data}", "${date}"
    )`
    db.query(sql, (err, result) => { });

    if (err) {
      console.log(err)
      res.json({
        status: "500",
        success: false
      });
      return;
    }
    res.json({
      status: "200",
      success: true
    });

  });
})

// 更改用户权限
router.post('/ChangePermission', (req, res) => {
  const data = req.body;
  console.log(data)
  let sql = `update user set
    permission = "${data.permission}"
    where username = "${data.username}"`;
  db.query(sql, (err, result) => {

    const date = String(new Date()).slice(0, 24);
    sql = `insert into log values(
      0, "Administrator", "${data.activeUser}", "ChangePermission", "${err ? err : data}", "${date}"
    )`
    db.query(sql, (err, result) => { });

    if (err) {
      console.log(err)
      res.json({
        status: "500",
        success: false
      });
      return;
    }
    res.json({
      status: "200",
      success: true
    });

  });
})

module.exports = router;