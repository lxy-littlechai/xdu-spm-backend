var express = require('express');
var router = express.Router();

// 引入数据库配置文件
const db = require('./database');

//登入
router.post('', (req, res) => {
  const data = req.body;
  console.log(data)

  const sql = `select permission from user where
   username = "${data.username}" and
   password = "${data.password}"
   `;
  db.query(sql, (err, result) => {
    console.log(result == false)
    if (err || result == false) {
      console.log(err)
      res.json({
        status: "500",
        success: false
      });
      return;
    }
    res.json({
      success: true,
      ...result[0]
    });

  });
})

module.exports = router;