var express = require('express');
var router = express.Router();

// 引入数据库配置文件
const db = require('../api/database')

// 查找用户
router.post('/GetAccount', (req, res) => {
  const data = req.body;
  console.log(data)

  let sql = `select * from user `;
  const op = `where username = "${data.username}"`;

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
    "${data.username}","${data.password}","${data.permission}","${data.email}"
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

// 删除用户
router.post('/DeleteAccount', (req, res) => {
  const data = req.body;
  console.log(data)

  let sql = `delete from user where username = "${data.username}"`;
  db.query(sql, (err, result) => {

    const date = String(new Date()).slice(0, 24);
    sql = `delete from user where username = "${data.username}`
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

// 系统参数设置
router.post('/SetSystemOption', (req, res) => {
  const data = req.body;
  let sql = `update \`system\` set
  feeAmt = "${data.feeAmt}",
  borrowLimit = "${data.borrowLimit}"
  where mode = "1"
  `
  db.query(sql, (err, result) => {
    if (err) {
      res.json({
        status: 200,
        success: false
      })
      console.log(err)
      return;
    }
    res.json({
      status: 200,
      success: true
    })
  })

})

router.post('/GetSystemOption', (req, res) => {
  const data = req.body;
  let sql = `select * from \`system\` 
  `
  db.query(sql, (err, result) => {
    if (err) {
      res.json({
        status: 200,
        success: false
      })
      console.log(err)
      return;
    }
    res.json({
      status: 200,
      success: true,
      result
    })
  })

})

module.exports = router;