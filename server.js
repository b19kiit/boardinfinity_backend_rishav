/*
Author : Rishav Bhowmik
About Rishav : Legends say He Haunts anyone who tries to copy his code during hackthlons. Be Aware!
*/

const fs = require('fs');
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const ms = require('ms')

var MANIFEST;
var TASKS_COLLECTION;
//starting server
(async () => {
  try {
    MANIFEST = JSON.parse(await fs.readFileSync('./manifest.json'))
    console.log("Manifest Loaded");
    const PORT = process.env.PORT || MANIFEST.server.port
    TASKS_COLLECTION = await new MongoCollection(MANIFEST.mongodb.tasks.uri, MANIFEST.mongodb.tasks.db_name, MANIFEST.mongodb.tasks.collection_name)
    console.log("DataBase is Connected");
    app.listen(PORT)
    console.log(`Listening to PORT : ${PORT}`);

    //testing actions
    test()
  } catch (e) {
    console.error(e);
  }
})()

class MongoCollection {
  constructor(uri, db, col) {
    const this_class=this;
    return new Promise(function(resolve, reject) {
      try {
        const MongoClient = require('mongodb').MongoClient;
        this_class.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this_class.client.connect(err => {
          if(err){reject(err); return}
          this_class.collection = this_class.client.db(db).collection(db);
          resolve(this_class)
        });
      } catch (e) {
        reject(e)
      }
    });
  }
  insert(obj){
    const this_class=this;
    return new Promise(function(resolve, reject) {
      try {
        this_class.collection.insertOne(obj, (err, result)=>{
          if(err){reject(err); return}
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    });
  }
  find(cond = {}){
    const this_class=this;
    return new Promise(function(resolve, reject){
      try {
        this_class.collection.find(cond).toArray((err, results)=>{
          if(err){reject(err); return}
          resolve(results)
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}

class InputFilter{
  static name (name, _default){
    if( (!name)||(typeof name != 'string')||(!name.length) ) return _default
    const name_arr = name.match(/([\!-\}])|(\ )/g)
    if(name.length != name_arr.length) throw Error("invalid input in name")
    return name_arr.join('')
  }
  static ms_time(mss){
    try {
      const mil = ms(mss)
      if(!mil) throw Error('')
      return mil;
    } catch (e) {
      throw Error('Invalid input in duration')
    }
  }
}

app.use('/\*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Content-Type")
    res.header("Access-Control-Allow-Methods","GET, POST, PUT")
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})

app.get('/', (req, res)=>{
  res.write("<a href=\"https://github.com/b19kiit/boardinfinity_backend_rishav\">GitHub Repository</a><br>")
  res.end("This is deployed on Tue Sep 08 2020 22:53:41 GMT+0530 (India Standard Time)")
})
//end points
app.post('/add', jsonParser, async (req, res, next)=>{
  try {
    const doc = {
      "name": InputFilter.name(req.body.name, MANIFEST.APP_DEFAULTS.task_name),
      "description": req.body.description || MANIFEST.APP_DEFAULTS.task_description,
      "creator": InputFilter.name(req.body.creator, MANIFEST.APP_DEFAULTS.task_creator),
      "createdAt": new Date(Date.now()),
      "duration": InputFilter.ms_time(req.body.duration || MANIFEST.APP_DEFAULTS.task_duration),
      "expiresAt":new Date(Date.now()+Number(ms(req.body.duration || MANIFEST.APP_DEFAULTS.task_duration)))
    }
    await TASKS_COLLECTION.insert(doc)
    res.json(doc)
  } catch (e) {
    res.status(400).json( {"err":`${e}`} )
  }
})

app.get('/list', async (req, res, next)=>{
  try {
    const docs = await TASKS_COLLECTION.find()
    res.json(docs)
  } catch (e) {
    res.end( {"err":e} )
  }
})

async function test() {
  try {
    /*await TASKS_COLLECTION.insert(
      {"name":"Unname task", "description":"anything\nhere", "creator":"Anonimus", "createdAt":new Date(), "duration":1*1000}
    )*/
    //const docs = await TASKS_COLLECTION.find()
    //console.log(docs);
  } catch (e) {
    console.log(e);
  }
}
