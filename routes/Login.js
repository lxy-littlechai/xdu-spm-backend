var express = require('express');
var router = express.Router();

// 引入数据库配置文件
const db = require('../api/database');

//登入
router.post('', (req, res) => {
  const data = req.body;
  console.log(data)

  let sql = `select permission from user where
   username = "${data.username}" and
   password = "${data.password}"
   `;
  db.query(sql, (err, result) => {
    console.log(result)



    console.log(result == false)
    if (err || result == false) {
      console.log(err)
      res.json({
        status: "500",
        success: false
      });
      return;
    }
    const permission = result[0].permission;
    const date = String(new Date()).slice(0, 24);
    sql = `insert into log values(
      0, "${permission}", "${data.username}", "Login", "${err ? err : 'success'}", "${date}"
    )`
    db.query(sql, (err, result) => { });

    res.json({
      success: true,
      ...result[0]
    });

  });


})

module.exports = router;