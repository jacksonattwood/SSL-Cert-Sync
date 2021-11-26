const conf = require('./config.json');
const express = require("express");
const path = require('path');
const router = express()
const concat = require('concat')
const fs = require('fs');
const zip_a_folder = require('zip-a-folder');
zip_a_folder.zip('./client', 'client.zip');

// TIMESTAMP DEPENDENCIES
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
const timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds

if (conf.logging == 1){
    loginittext = "Script started at " + timestamp
    fs.appendFile('access.log', `\n${loginittext}`, (err) => {
        if (err) throw err;
      }); 

}

router.get("/", (req,res)=>{
    if (conf.authKey == req.headers['auth-key']){
        res.sendFile(conf.certroot.concat(req.headers['file']));
        if (conf.logging == 1){
            logtext = timestamp + ": " + conf.certroot + req.headers['file'] + " requested by " + req.ip
            console.log(logtext)
            fs.appendFile('access.log', `\n${logtext}`, (err) => {
                if (err) throw err;
              }); 

        }
    } 
    else {
        if (conf.client_download_enabled == 1){
            express.static(path.join(__dirname, '/' + 'client.zip'))
            res.sendFile(__dirname + '/' + 'client.zip')
        } else {
        res.send(conf.autherror)
        if (conf.logging == 1){
            logtext = timestamp + ": !FAILED AUTH! by" + req.ip + conf.certroot + req.headers['file'] + " requested by " + req.ip
            console.log(logtext)
            fs.appendFile('access.log', `\n${logtext}`, (err) => {
                if (err) throw err;
              });
        }
        }
    }
})

router.listen(conf.port, () => {
    console.log(`Example app listening at http://localhost:${conf.port}`)
  })
