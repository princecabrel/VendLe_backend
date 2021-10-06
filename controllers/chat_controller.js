const express = require('express');
const app = express();
const http = require('http');
const server=http.createServer(app);
const socketio = require('socket.io');
const moment = require('moment');
const io = socketio(server);
const database = 'mongodb://localhost:27017/';
const Message=require('../models/message_model')

//format messsage function
const formatMessage = (data) => {
    msg = {
        from:data.fromUser,
        to:data.toUser,
        message:data.msg,
        date: moment().format("YYYY-MM-DD"),
        time: moment().format("hh:mm a")
    }
    return msg;
}

io.on('connection', (socket) => {

    console.log('New connection with socket',socket);

    socket.on('receive_message', (data) =>{ //recieves message from client-end along with sender's and reciever's details
        var dataElement = formatMessage(data);
        mongoClient.connect(database, (err,db) => {
            if (err)
                {
                    console.log(err.message)
                    throw err;
                }
            else {
                Message.insertOne(data, (err,res) => { //inserts message to into the database
                    if(err) throw err;
                    socket.emit('sent_message',data); //emits message back to the user for display
                });
            }
            db.close();
        });
        var userID = socket.id;
        socket.on('disconnect', () => {
            console.log(`${userID}disconnected`)
        }); 

    });

})

module.exports.createMessage=(req,res,next)=>{
    const message=new Message({
        ...req.body
    })
    message.save()
    .then((mess)=>res.status(200).json(mess))
    .catch(error=>res.status(500).json(error.message))
}
module.exports.getProductDiscussion=(req,res,next)=>{
    Message.find({sender:{id:req.params.id}})
    .populate('product')
    .then(async messages=>{
        let allMessage;
        let groupedProduct;
       groupedProduct=groupBy(messages,product)
       allMessage=groupBy(groupedProduct,discussionID)
       res.status(200).json({messages:allMessage})
    })
    .catch(error=>res.status(500).json(error.json))
}

function groupBy(table,id){
    table.reduce(function (r, a) {
        r[a.id] = r[a.id] || [];
        r[a.id].push(a);
        return r;
    })
}
