const express = require('express')
const app = express()
const cors=require('cors')
const nodeCron = require("node-cron");
let updateFun=require('./modeler/functions')

app.use(express.static(__dirname+"/public"));
app.use(cors())

let errorHandler=function(error){console.log(error)}


app.post('/washProcess/:orderID/:totalItems', function(req,res){
  updateFun.washingFun(req.params.orderID,req.params.totalItems,res);
})

app.post('/ironProcess/:orderID/:totalItems', function(req,res){
  updateFun.ironingFun(req.params.orderID,req.params.totalItems,res);
})

const job = nodeCron.schedule("0 0 0 * * *", function jobYouNeedToExecute() {
  // Do whatever you want in here. Send email, Make  database backup or download data.
  updateFun.resetFun();
});

app.get('/',function(req,res){
  res.sendFile(__dirname+'/public/index.html')
})

app.listen(process.env.PORT || 5000,function(error){
  if(error){
    console.log(error)
  }
  else{
    job;
    console.log('Listening at 5000')
  }
})