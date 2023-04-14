var express = require('express');
var router = express.Router();

// 引入数据库配置文件
const db = require('./database');

router.post('/Log', (req, res) => {
  let sql = `select * from log `
  db.query(sql, (err, result) => {
    if (err) {
      return;
    }
    res.json({
      status: "200",
      result
    })
  })
})






module.exports = router;