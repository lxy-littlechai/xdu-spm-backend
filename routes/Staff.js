var express = require('express');
var router = express.Router();

// 引入数据库配置文件
const db = require('./database')

//ISBN查书
router.post('/GetBookByISBN', (req, res) => {
  const data = req.body;

  const sql = `select * from booklist where ISBN = "${data.ISBN}"`;
  db.query(sql, (err, result) => {

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
      result,
    });

  });
})

// 加书
router.post('/AddBook', (req, res) => {
  const data = req.body;
  console.log(data)
  const sql = `insert into booklist values(
    "${data.id}","${data.name}","${data.author}",${data.resNumber},"${data.ISBN}","${data.img}"
    )`;
  db.query(sql, (err, result) => {

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

// 更新书
router.post('/UpdateBook', (req, res) => {
  const data = req.body;

  const sql = `update booklist set
    id = "${data.id}",
    name = "${data.name}",
    author = "${data.author}",
    resNumber = ${data.resNumber},
    img = "${data.img}" 
    where ISBN = "${data.ISBN}"`;
  db.query(sql, (err, result) => {

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

// 删除书
router.post('/DeleteBook', (req, res) => {
  const data = req.body;

  const sql = `delete from booklist where ISBN = "${data.ISBN}"`;
  db.query(sql, (err, result) => {

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

// 借书
router.post('/BorrowBook', (req, res) => {
  const data = req.body;

  const sql = `update booklist set
    resNumber = resNumber - 1
    where ISBN = "${data.ISBN}"`;
  db.query(sql, (err, result) => {

    if (err) {
      console.log(err)
      res.json({
        status: "500",
        success: false
      });
      return;
    }
    const sql = `insert into borrowedbook values(
      "${data.name}", "${data.ISBN}", "${data.startTime}", 0
    )`
    db.query(sql, (err, result) => {
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
    })


  });
})

// 还书
router.post('/ReturnBook', (req, res) => {
  const data = req.body;
  console.log(data)
  const sql = `update booklist set
    resNumber = resNumber + 1
    where ISBN = "${data.ISBN}"`;
  db.query(sql, (err, result) => {

    if (err) {
      console.log(err)
      res.json({
        status: "500",
        data: {
          success: false
        }
      });
      return;
    }
    const sql = `delete from borrowedbook where borrowId = "${data.borrowId}"`
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        res.json({
          status: "500",
          data: {
            success: false
          }
        });
        return;
      }
      res.json({
        status: "200",
        success: true
      });
    })

  });
})

module.exports = router;