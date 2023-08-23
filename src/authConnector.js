//import mongoose from 'mongoose';

import { MONGO_URI } from './mongoConfig.js';

const mongoose = require('mongoose');

async function authConnector() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Auth DB Connected');
    }
    catch (err) {
        console.log("Unable to connect to Auth DB");
        console.error(err);
    }
}

export default authConnector;