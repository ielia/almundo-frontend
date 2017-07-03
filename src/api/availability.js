'use strict';

import express from 'express';
import HotelModel from '../models/hotels';

function parseQueryObject(query) {
    return Object.keys(query).reduce((acc, key) => {
        const value = query[key];
        if (typeof(value) === 'string' && value.startsWith('{')) {
            try {
                acc[key] = JSON.parse(value);
            } catch (error) {
                acc[key] = value;
            }
        } else {
            acc[key] = value;
        }
        return acc;
    }, {});
}

export default ({ config, db }) => {
    const router = express.Router();

    router.get('/:location/:inYear/:inMonth/:inDay/:outYear/:outMonth/:outDay/:guests', (req, res) => {
        const filter = parseQueryObject(req.query);
        console.log(filter);
        HotelModel.find(filter, (err, hotels) => {
            res.status(err ? 500 : 200).json({
                result: err ? 'ERROR' : 'OK',
                instances: hotels,
                err: err
            });
        });
    });

    return router;
}
