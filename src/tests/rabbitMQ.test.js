'use strict';

const { connectToRabbitMQ, connectToRabbitMQForTest } = require('../dbs/initRabbit');
describe('RabbitMQ Connection', () => {
    it('should connect to successful RabbitMQ', async () => {
        const result = await connectToRabbitMQForTest();
        expect(result).toBeUndefined();
    });
});
