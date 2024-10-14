const express = require(`express`);
const app = express();

const mongoose = require(`./database/mongoose`);

const TaskList = require(`./database/models/taskList`);
const Task = require(`./database/models/task`);

/*
CORS- cross origin request security
Backend- http://localhost:3000
Frontend- http://localhost:4200
*/
// first middleware add header
app.use(function(req,res,next) {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`Access-Control-Allow-Methods`, `GET,POST,OPTIONS,PUT,PATCH,DELETE`);
    res.setHeader(`Access-Control-Allow-Headers`,`Origin`,`X-Requested-With,Content-Type, Accept`);
   next(); // pas to next middleware
});

// second middleware
app.use(express.json());

app.get(`/tasklists`, (req,res) => {
    TaskList.find({})
    .then((list) => {
        res.status(200);
        res.send(list)
       
    })
    .catch((error) => {console.log(error)});
});

app.get(`/tasklists/:tasklistId`, (req,res) => {
    let tasklistId=req.params.tasklistId;

    TaskList.find({_id:tasklistId})
    .then((taskList) => {
        res.status(200);
        res.send(taskList)
       
    })
    .catch((error) => {console.log(error)});
});

// full update of an object
app.put(`/tasklists/:tasklistId`, (req,res) => {
    TaskList.findOneAndUpdate({_id:req.params.tasklistId}, {$set:req.body})
    .then((taskList) => {
        res.status(200);
        res.send(taskList)
       
    })
    .catch((error) => {console.log(error)});
});

// partial update of one field of an object
app.patch(`/tasklists/:tasklistId`, (req,res) => {
    TaskList.findOneAndUpdate({_id:req.params.tasklistId}, {$set:req.body})
    .then((taskList) => {
        res.status(200);
        res.send(taskList)
       
    })
    .catch((error) => {console.log(error)});
});

app.delete(`/tasklists/:tasklistId`, (req,res) => {
    TaskList.findByIdAndDelete(req.params.tasklistId)
    .then((taskList) => {
        res.status(200);
        res.send(taskList)
       
    })
    .catch((error) => {console.log(error)});
});

app.post(`/tasklists`, (req,res) => {

    console.log(req.body);
    let taskListObj = {'title':req.body.title};
    TaskList(taskListObj).save()
    .then((list) => {
        res.status(201);
        res.send(list)
      
    })
    .catch((error) => {console.log(error)});
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});