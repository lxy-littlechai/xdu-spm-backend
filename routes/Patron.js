var express = require('express');
var router = express.Router();

// 引入数据库配置文件
const db = require('./database')

// 根据label查书
router.post('/BookSearch', (req, res) => {
  const data = req.body;
  console.log(data)
  let op = "";
  switch (data.label) {
    case "name":
      op = `where name like "%${data.content}%"`
      break;
    case "author":
      op = `where author like "%${data.content}%"`
      break;
    default:
      break;
  }
  const sql = 'SELECT * FROM booklist ' + op;
  db.query(sql, (err, result) => {

    if (err) {
      return;
    }
    // res：API传数据
    // result：返回的数据，需要转成JSON格式
    res.json({
      status: "200",
      result
    });

  });
})

//查已借的书
router.post('/GetBorrowedBook', (req, res) => {
  console.log(req.body)
  const username = req.body.username;
  const sql = `SELECT * FROM borrowedbook as bo, booklist as list 
               where bo.username = "${username}" and list.ISBN = bo.ISBN`;
  db.query(sql, (err, result) => {

    if (err) {
      return;
    }
    // res：API传数据
    // result：返回的数据，需要转成JSON格式
    res.json({
      status: "200",
      result
    });

  });
})

module.exports = router;

