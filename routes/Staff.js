var express = require('express');
var router = express.Router();

// 引入数据库配置文件
const db = require('./database')

//ISBN查书
router.post('/GetBookByISBN', (req, res) => {
  const data = req.body;

  let sql = `select * from booklist where ISBN = "${data.ISBN}"`;
  db.query(sql, (err, result) => {

    const date = String(new Date()).slice(0, 24);
    sql = `insert into log values(
      0, "Staff", "${data.activeUser}", "GetBookByISBN", "${err ? err : data.ISBN}", "${date}"
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
      result,
    });

  });


})

// 加书
router.post('/AddBook', (req, res) => {
  const data = req.body;
  console.log(data)
  let sql = `insert into booklist values(
    "${data.id}","${data.name}","${data.author}",${data.resNumber},"${data.ISBN}","${data.img}"
    )`;
  db.query(sql, (err, result) => {
    const date = String(new Date()).slice(0, 24);
    sql = `insert into log values(
      0, "Staff", "${data.activeUser}", "AddBook", "${err ? err : data}", "${date}"
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

// 更新书
router.post('/UpdateBook', (req, res) => {
  const data = req.body;

  let sql = `update booklist set
    id = "${data.id}",
    name = "${data.name}",
    author = "${data.author}",
    resNumber = ${data.resNumber},
    img = "${data.img}" 
    where ISBN = "${data.ISBN}"`;
  db.query(sql, (err, result) => {

    const date = String(new Date()).slice(0, 24);
    sql = `insert into log values(
      0, "Staff", "${data.activeUser}", "UpdateBook", "${err ? err : data}", "${date}"
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

// 删除书
router.post('/DeleteBook', (req, res) => {
  const data = req.body;

  let sql = `delete from booklist where ISBN = "${data.ISBN}"`;
  db.query(sql, (err, result) => {

    const date = String(new Date()).slice(0, 24);
    sql = `insert into log values(
      0, "Staff", "${data.activeUser}", "DeleteBook", "${err ? err : data.ISBN}", "${date}"
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

// 借书
router.post('/BorrowBook', (req, res) => {
  const data = req.body;

  let sql = `update booklist set
    resNumber = resNumber - 1
    where ISBN = "${data.ISBN}"`;
  db.query(sql, (err, result) => {

    const date = String(new Date()).slice(0, 24);
    sql = `insert into borrowedbook values(
      "${data.name}", "${data.ISBN}", "${data.startTime}", 0, 0
    )`
    db.query(sql, (err, result) => {
      if (err) {

        sql = `insert into log values(
          0, "Staff", "${data.activeUser}", "BorrowBook", "${err ? err : data.ISBN}", "${date}"
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
  let sql = `update booklist set
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
    sql = `delete from borrowedbook where borrowId = "${data.borrowId}"`
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)

        const date = String(new Date()).slice(0, 24);
        sql = `insert into log values(
          0, "Staff", "${data.activeUser}", "ReturnBook", "${err ? err : data.ISBN}", "${date}"
        )`
        db.query(sql, (err, result) => { });

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

// 确认支付
router.post('/confirmPay', (req, res) => {
  const data = req.body;

  let sql = `select ifPay from borrowedbook where borrowId = "${data.borrowId}"`;
  db.query(sql, (err, result) => {
    console.log(result[0])
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
      success: result[0].ifPay
    });

  });
})

//支付
router.post('/payFee', (req, res) => {
  const data = req.body;
  console.log(data)
  let sql = `update borrowedbook set ifPay = 1 where borrowId = "${data.borrowId}"`;
  db.query(sql, (err, result) => {

    const date = String(new Date()).slice(0, 24);
    sql = `insert into log values(
      0, "Patron", "${data.activeUser}", "payFee", "${err ? err : data.username + "pay " + data.borrowId}", "${date}"
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