'use strict';
const { consumerQueue, connectToRabbitMQ } = require('../dbs/initRabbit');

async function consumerToQueue(queueName) {
    try {
        const { channel, connection } = await connectToRabbitMQ();
        await consumerQueue(channel, queueName);
    } catch (error) {
        console.error('Error consumerToQueue:', error);
    }
}

module.exports = { consumerToQueue };
