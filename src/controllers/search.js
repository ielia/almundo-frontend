'use strict';

import express from 'express';
import path from 'path';

export default ({ config, db }) => {
    const router = express.Router();

    // This should be in a static container, but for the purposes of this demo, we'll host it in NodeJS.
    router.get('/', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../public/search.html'));
    });

    return router;
}
