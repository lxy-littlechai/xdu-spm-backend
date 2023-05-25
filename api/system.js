var express = require('express');
const db = require('./database')
const cron = require('node-cron');
const email = require('./sendEmail')

const scheduleOptions = {
  scheduled: false
}

const freeKeepDaysUpdate = cron.schedule("* * * * *", () => {
  let sql = `update borrowedbook set freeKeepDays = freeKeepDays-1`
  db.query(sql, () => {

  })
}, scheduleOptions)

const sendEmailDaily = cron.schedule("* * * * *", () => {

  let sql = `select * from user, borrowedbook as bo
              where user.username = bo.username and bo.freeKeepDays = 2
    `
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    result.map((item) => {
      email.sendMail(item.email, "", (state) => {
        if (state) {
          console.log(item.email, " success")
        }
        else {
          console.log(item.email, " failed")
        }
      })
    })


  })


}, scheduleOptions)


module.exports = {
  freeKeepDaysUpdate,
  sendEmailDaily
}
