'use strict';

var express = require('express');
var router = express.Router();

const { Kafka } = require('kafkajs');
const config = require('../config/kafka-config');

const kafka = new Kafka(config);

const producer = kafka.producer();


router.post('/topic/:topic', function (req, res) {
    
    try {
        const runProducer = async () => {
            const message = req.body;
            //To Do add validation for the body 
            //To Do add vaildation for kafka topic
            await producer.connect()
            await producer.send({
                topic: req.params.topic,
                messages:
                    [{ value: JSON.stringify(message) }],
            })
            res.status(201).send('Message sent successefully')
        }
    } catch (error) {
        res.status(500).send('Check logs')
    }
    

});

module.exports = router;
