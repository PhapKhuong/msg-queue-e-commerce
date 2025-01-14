'use strict';
const { consumerQueue, connectToRabbitMQ } = require('../dbs/initRabbit');

const log = console.log;
console.log = function () {
    log.apply(console, [new Date()].concat(arguments));
};

async function consumerToQueue(queueName) {
    try {
        const { channel, connection } = await connectToRabbitMQ();
        await consumerQueue(channel, queueName);
    } catch (error) {
        console.error('Error consumerToQueue:', error);
    }
}

// Success
async function consumerToQueueSuccess() {
    try {
        const { channel, connection } = await connectToRabbitMQ();
        const notificationQueue = 'notificationQueueProcess';
        const timeout = 15000;
        setTimeout(() => {
            channel.consume(notificationQueue, (msg) => {
                console.log('Send notification success:', msg.content.toString());
                channel.ack(msg);
            });
        }, timeout);
    } catch (error) {
        console.error(error);
    }
}

// Fail
async function consumerToQueueFail() {
    try {
        const { channel, connection } = await connectToRabbitMQ();
        const exchangeType = 'direct';
        const notificationQueueHandler = 'notificationQueueHandler';
        const notificationExchangeDLX = 'notificationExchangeDLX';
        const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX';

        await channel.assertExchange(notificationExchangeDLX, exchangeType, { durable: true });
        const queueResult = await channel.assertQueue(notificationQueueHandler, {
            exclusive: false,
        });

        await channel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX);
        await channel.consume(
            queueResult.queue,
            (msgFail) => {
                console.log('Send notification fail:', msgFail.content.toString());
            },
            { noAck: true },
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { consumerToQueue, consumerToQueueSuccess, consumerToQueueFail };
