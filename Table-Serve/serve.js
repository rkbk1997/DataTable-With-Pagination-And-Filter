const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
const playstore = require('./playstore'); 

const PORT = 8000;

const app = express();

app.use(bodyParser.json());

const mongoose =require('mongoose')

app.use(cors());




mongoose.connect('mongodb://localhost:27017/playstore', {useNewUrlParser: true,useUnifiedTopology: true},(error)=>{
    if(!error){
        console.log("Connection Success");
    }
    else{
        console.log("connection Not success");
    }
});

const sendappdata=(res)=>{
    fs.readFile('./_file/data.json', (err, data) => {
        if (err) throw err;
        let appdata = JSON.parse(data);
        // for(i=0; i < appdata.length -1 ;i++)
        // {
        //     MyData = new playstore(appdata[i]);
        //     MyData.save()
        //     console.log('data Save')
        // }
        res.send(appdata);
        res.end()
    })
}


app.listen(PORT, function () {
  console.log("Server running at...", PORT);
});

app.get('/show',async(req,res)=>{
    console.log('server hit')
    sendappdata(res);
    // res.send(appdata)
   });


app.post('/getplaystoredata', (req,res) =>{
    console.log(req.body)
    const skiprecord =req.body.skip;

    // const tempIndex=(pageindex-1)*10;
    // const pageLimit=10;
    const conditionalStatement=req.body.filter.Category ? req.body.filter:{}
    if(req.body.filter.Category)
    {
    playstore.find(req.body.filter).skip(skiprecord).limit(10).then((data)=>{console.log('data======>>>>>>>>>.',data.length)
    res.send(data)    
});
    }
    else{
        playstore.find({}).skip(skiprecord).limit(10).then((data)=>{console.log('data======>>>>>>>>>.',data.length)
    res.send(data)    
});
    }
    // playstore.find({},{skip:0, limit: 10},function(err, results) {
    //     res.send(results);
    //     console.log(results)
    // });

})



