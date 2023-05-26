var express = require('express');
var router = express.Router();

// 引入数据库配置文件
const db = require('../api/database')

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
  let sql = 'SELECT * FROM booklist ' + op;
  db.query(sql, (err, result) => {

    const date = String(new Date()).slice(0, 24);
    sql = `insert into log values(
      0, "Patron", "${data.activeUser}", "BookSearch", "${err ? err : data.label + " " + data.content}", "${date}"
    )`
    db.query(sql, (err, row) => { })

    if (err) {
      return;
    }
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
  let sql = `SELECT * FROM borrowedbook as bo, booklist as list 
               where bo.username = "${username}" and list.ISBN = bo.ISBN`;
  db.query(sql, (err, result) => {

    const date = String(new Date()).slice(0, 24);
    sql = `insert into log values(
        0, "Patron", "${username}","GetBorrowedBook", "${err ? err : 'success'}", "${date}"
      )`
    db.query(sql, (err, row) => { })

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

//查历史借书
router.post('/GetHistoricalBook', (req, res) => {
  console.log(req.body)
  const username = req.body.username;
  let sql = `SELECT * FROM spm.historical_borrowed_book his natural join spm.booklist
  left join 
  (select ifPay, freeKeepDays, fee, borrowId  from spm.borrowedbook) as A
  on his.borrowId  = A.borrowId
  `;
  db.query(sql, (err, result) => {

    const date = String(new Date()).slice(0, 24);
    sql = `insert into log values(
        0, "Patron", "${username}","GetHistoricalBook", "${err ? err : 'success'}", "${date}"
      )`
    db.query(sql, (err, row) => { })

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

