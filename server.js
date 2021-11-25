const conf = require('./config.json');
const express = require("express");
const { append } = require('vary');
const path = require('path');
const { join } = require('path/posix');
const router = express()

router.get("/", (req,res)=>{
    if (conf.authKey == req.headers['auth-key']){
        res.sendFile(join(conf.certroot + req.headers['file']));
    } 
    else {
        // res.send(conf.autherror)
        res.send(conf.autherror)
    }
})

router.listen(conf.port, () => {
    console.log(`Example app listening at http://localhost:${conf.port}`)
  })
