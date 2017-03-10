var express = require('express');
var messageRouter = express.Router();
var Message = require('../models/message');

//POST request to save message
messageRouter.post('/', function(req, res, next) {
    var message = new Message({
         content: req.body.content
    });
    message.save(function(err, result) {
        if(err){
            return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
        }
        res.status(201).json({
            message: 'Message Saved',
            obj: result
        });
    });
});

//GET request to retrieve all messages
messageRouter.get('/', function(req, res, next) {
    Message.find()
            .exec(function(err, messages) {
                if(err){
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                 }
                res.status(201).json({
                    message: 'Success',
                    obj: messages
                });
            });
});

//PATCH request to update the message
messageRouter.patch('/:id', function(req, res, next) {
    Message.findById(req.params.id, function(err, message){
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err 
            });
        }
        if(!message) {
            return res.status(500).json({
                title: 'No message found',
                error: {message: 'Message not found'}
            });
        }
        message.content = req.body.content;
        message.save(function(err, result) {
            if(err){
                return res.status(500).json({
                        title: 'An error occured',
                        error: err
                });
            }
            res.status(200).json({
                message: 'Message Updated',
                obj: result
            });
        });
    });
});

//DELETE request to delete the message
messageRouter.delete('/:id', function(req, res, next) {
    Message.findById(req.params.id, function(err, message){
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err 
            });
        }
        if(!message) {
            return res.status(500).json({
                title: 'No message found',
                error: {message: 'Message not found'}
            });
        }
        message.remove(function(err, result) {
            if(err){
                return res.status(500).json({
                        title: 'An error occured',
                        error: err
                });
            }
            res.status(200).json({
                message: 'Message Deleted',
                obj: result
            });
        });
    });
});

module.exports = messageRouter;