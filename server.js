'use strict';
const messageService = require('./src/services/consumerQueueService');
const queueName = 'test-topic';
messageService
    .consumerToQueue(queueName)
    .then(console.log('Message consumer started', queueName))
    .catch((error) => {
        console.error('Message error:', error);
    });
