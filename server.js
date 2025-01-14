'use strict';
const messageService = require('./src/services/consumerQueueService');
// const queueName = 'AN_JA';
// messageService
//     .consumerToQueue(queueName)
//     .then(console.log('Message consumer started', queueName))
//     .catch((error) => {
//         console.error('Message error:', error);
//     });

messageService
    .consumerToQueueSuccess()
    .then(console.log('Notification success started'))
    .catch((error) => {
        console.error('Message error:', error);
    });

messageService
    .consumerToQueueFail()
    .then(console.log('Notification fail started'))
    .catch((error) => {
        console.error('Message error:', error);
    });
