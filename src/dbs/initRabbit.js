'use strict';
const amqp = require('amqplib');

async function connectToRabbitMQ() {
    try {
        const connection = await amqp.connect('amqp://guest:2021@localhost:5772');
        if (!connection) throw new Error('Connection is not established');
        const channel = await connection.createChannel();
        return { channel, connection };
    } catch (error) {}
}

async function connectToRabbitMQForTest() {
    try {
        const { channel, connection } = await connectToRabbitMQ();
        const queue = 'Test queue';
        const message = 'Hello An_ja';
        await channel.assertQueue(queue);
        await channel.sendToQueue(queue, Buffer.from(message));
        await connection.close();
    } catch (error) {
        console.error('Error connect to rabbitMQ:', error);
    }
}

async function consumerQueue(channel, queueName) {
    try {
        await channel.assertQueue(queueName, { durable: true });
        console.log('Waiting for message ...');
        channel.consume(
            queueName,
            (msg) => {
                console.log(`Message: ${Object.entries(msg)}`);
                console.log(`Received message: ${queueName}::`, msg.content.toString());
            },
            {
                noAck: true,
            },
        );
    } catch (error) {
        console.error('Error publish message to rabbitMQ:', error);
        throw error;
    }
}

module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQForTest,
    consumerQueue,
};
