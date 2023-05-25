var express = require('express');
var router = express.Router();

// 引入数据库配置文件
const db = require('../api/database');
const exec = require('child_process').exec;

//查日志
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

//查所有借的书
router.post('/GetAllborrowedBook', (req, res) => {
  let sql = `select * from borrowedbook `
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

//查所有用户记录
router.post('/GetAllUser', (req, res) => {
  let sql = `select * from user `
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

//备份数据库
router.post('/BackUpDB', (req, res) => {
  let cmd = `mysqldump -uroot -p123456 spm > E:/University/大三/SPM/database/spm_bk.db`
  exec(cmd, (error, stdout, stderr) => {
    console.log(error, stdout, stderr);
    res.json({
      status: "200",
      success: true
    })
  })
})

//还原数据库
router.post('/RestoreDB', (req, res) => {
  let cmd = `mysql -uroot -p123456 spm < E:/University/大三/SPM/database/spm_bk.db `
  exec(cmd, (error, stdout, stderr) => {
    console.log(error, stdout, stderr);
    res.json({
      status: "200",
      success: true
    })
  })
})



module.exports = router;