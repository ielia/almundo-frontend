'use strict';

import config from 'config';
import mongoose from 'mongoose';

export default callback => {
    // connect to a database if needed, then pass it to `callback`:
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongoDB, { useMongoClient: true });
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => console.log('Connected to MongoDB'));
    db.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
        db = mongoose.connect(config.mongoDB);
        db.on('open', () => console.log('Reconnected to MongoDB'));
    });
    console.log('CONNECTING');
    callback(db);
}
