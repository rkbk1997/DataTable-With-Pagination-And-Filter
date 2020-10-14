const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
const playstore = require('./playstore');
const PORT = 8000;
const app = express();
app.use(bodyParser.json());
const mongoose = require('mongoose')
app.use(cors());

mongoose.connect('mongodb://localhost:27017/playstore', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (!error) {
        console.log("Connection Success");
    }
    else {
        console.log("connection Not success");
    }
});

const sendappdata = (res) => {
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

app.get('/show', async (req, res) => {
    console.log('server hit')
    sendappdata(res);
    // res.send(appdata)
});

app.post('/getplaystoredata', (req, res) => {
    console.log(req.body)
    const skiprecord = req.body.skip;
    if (req.body.filter) {
        playstore.find(req.body.filter).skip(skiprecord).limit(10).then((data) => {
            console.log('data======>>>>>>>>>.', data.length)
            res.send(data)
        });
    }
    else {
        playstore.find({}).skip(skiprecord).limit(10).then((data) => {
            console.log('data======>>>>>>>>>.', data.length)
            res.send(data)
        });
    }
})


app.post('/getapp', (req, res) => {
    console.log(req.body)
    playstore.find({ _id: req.body.id }).then((data) => {
        console.log(data)
        res.send(data)
    })
})

app.post('/updateapp',(req,res)=>{
    console.log(req.body)
    playstore.update({_id:req.body._id},{$set:{'App':req.body.App,'Category':req.body.Category,'Rating':req.body.Rating}},(error,result)=>{
        if(error){
            console.log(error)
        }else{
            res.send(true);
        }
    })
})