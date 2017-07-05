'use strict';

import express from 'express';
import HotelModel from '../models/hotels';

function listFilter(spec, operator) {
    if (spec) {
        return { [operator]: spec.split(',') };
    } else {
        return undefined;
    }
}

function inFilter(spec) {
    return listFilter(spec, '$in');
}

/**
 * This function should be a service call to obtain the right place in English.
 *
 * @param spec Filter spec.
 * @returns {{}} MongoDB filter object.
 */
function locationFilter(spec) {
    let filter = {};
    if (spec) {
        filter = { $or: [ { 'location.city': spec }, { 'location.country': spec } ] };
    }
    return filter;
}

function rangeFilter(spec) {
    if (spec) {
        const bounds = spec.split('-');
        if (bounds.length !== 2) {
            throw new Error("Invalid range spec.");
        }
        return { $gte: Number(bounds[0]), $lte: Number(bounds[1]) };
    } else {
        return undefined;
    }
}

function parseFilter(params, query) {
    const filter = locationFilter(params.location),
        name = query.name,
        // currency = query.currency,
        price = rangeFilter(query.price),
        stars = inFilter(query.stars);
    /*
     * For the purposes of this demo, I'm going to omit filters having to do with
     * :inYear, :inMonth, :inDay, :outYear, :outMonth, :outDay and :guests.
     */
    if (name) filter.name = { $regex: name };
    if (price) filter['price.amount'] = /* convert(currency, price) */ price;
    if (stars) filter.stars = stars;
    return filter;
}

export default () => {
    const router = express.Router();

    router.get('/:location/:inYear/:inMonth/:inDay/:outYear/:outMonth/:outDay/:guests', (req, res) => {
        const filter = parseFilter(req.params, req.query);
        console.log(JSON.stringify(filter));
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
