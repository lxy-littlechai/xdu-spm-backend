var express = require('express');
const db = require('./database')
const cron = require('node-cron');

const freeKeepDaysUpdate = cron.schedule("* * * * *", () => {
  let sql = `update borrowedbook set freeKeepDays = freeKeepDays-1`
  db.query(sql, () => {

  })
})

const sendEmail = cron.schedule("* * * * *", () => {

  let sql = `select * from user, borrowedbook as bo
              where user.username = bo.username
    `
  db.query(sql, (req, err) => {
    if (err) {
      return;
    }
    console.log(req);

  })
  /* const mail = "18263474525@163.com"
  email.sendMail(mail, "", (state) => {
    if (state) {
      console.log("email success")
    }
    else {
      console.log("email failed")
    }
  })
  console.log("running a task") */
})


module.exports = {
  sendEmail
}
