const conf = require('./config.json');
const express = require("express");
const https = require('https');
const path = require('path');
const concat = require('concat')
const fs = require('fs');
const router = express()
var servertype = null
const zip_a_folder = require('zip-a-folder');
zip_a_folder.zip('./client', 'client.zip');
const time = require('./time.js');

// HTTPS
var credentials = {
    key: fs.readFileSync(conf.privatekey), 
    cert: fs.readFileSync(conf.certificate)
};


if (conf.logging == 1){
    loginittext = "Script started at " + time.getTimestamp()
    fs.appendFile('access.log', `\n${loginittext}`, (err) => {
        if (err) throw err;
      }); 

}

router.get("/", (req,res)=>{
    if (conf.authKey == req.headers['auth-key']){
        res.sendFile(conf.certroot.concat(req.headers['file']));
        if (conf.logging == 1){
            logtext = time.getTimestamp() + ": " + conf.certroot + req.headers['file'] + " requested by " + req.ip
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
            if (conf.logging == 1){
            logtext = time.getTimestamp() + ": client.zip requested by " + req.ip
            console.log(logtext)
            fs.appendFile('access.log', `\n${logtext}`, (err) => {
                if (err) throw err;
              }); 
            }
        } else {
        res.send(conf.autherror)
        if (conf.logging == 1){
            logtext = time.getTimestamp() + ": !FAILED AUTH! by" + req.ip
            console.log(logtext)
            fs.appendFile('access.log', `\n${logtext}`, (err) => {
                if (err) throw err;
              });
        }
        }
    }
})

if (conf.https == "true"){
    servertype = "https"
    https.createServer(credentials, router).listen(conf.port, () => {
        console.log(time.getTimestamp() + `: SSL Sync (Master) listening at ` + servertype + `://0.0.0.0` + `:${conf.port}`)
    })
} else if (conf.https = "false"){
    servertype = "http"
    router.listen(conf.port, () => {
        console.log(time.getTimestamp() + `: SSL Sync (Master) listening at ` + servertype + `://0.0.0.0` + `:${conf.port}`)
      })
}