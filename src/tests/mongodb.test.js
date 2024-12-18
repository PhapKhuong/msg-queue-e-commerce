'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const user = process.env.DEV_DB_USER;
const pwd = process.env.DEV_DB_PASSWORD;
const host = process.env.DEV_DB_HOST;
const port = process.env.DEV_DB_PORT;
const name = process.env.DEV_DB_NAME;
const connectionStr = `mongodb://${user}:${pwd}@${host}:${port}/${name}`;
const TestSchema = new mongoose.Schema({ name: String });
const Test = mongoose.model('Test', TestSchema);

describe('Mongoose connection', () => {
    let connection;

    beforeAll(async () => {
        connection = await mongoose.connect(connectionStr);
    });

    afterAll(async () => {
        await connection.disconnect();
    });

    it('should connect to mongoose', () => {
        expect(mongoose.connection.readyState).toBe(1);
    });

    it('should save document to the database', async () => {
        const user = new Test({ name: 'An_ja' });
        await user.save();
        expect(user.isNew).toBe(false);
    });

    it('should find a document from database', async () => {
        const user = await Test.findOne({ name: 'An_ja' });
        expect(user).toBeDefined();
        expect(user.name).toBe('An_ja');
    });
});
