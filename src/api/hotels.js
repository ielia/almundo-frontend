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

export default () => {
    const router = express.Router();

    router.get('/', (req, res) => {
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

    router.get('/:_id', (req, res) => {
        HotelModel.findById(req.params._id, (err, hotel) => {
            res.status(err ? 500 : 200).json({
                result: err ? 'ERROR' : 'OK',
                instance: hotel,
                err: err
            });
        });
    });

    router.post('/', (req, res) => {
        // console.log(req.body);
        HotelModel.create(req.body, (err, hotel) => {
            res.status(err ? 400 : 200).json({
                result: err ? 'ERROR' : 'OK',
                instance: hotel,
                err: err
            });
        });
    });

    router.put('/:_id', (req, res) => {
        HotelModel.findById(req.params._id, (err, hotel) => {
            if (err) {
                res.status(404).json({
                    result: 'ERROR',
                    err: err
                });
            } else {
                Object.keys(req.body).filter(key => key !== '_id').reduce((hotelInstance, key) => {
                    hotelInstance[key] = req.body[key];
                    return hotelInstance;
                }, hotel);
                hotel.save((err) => {
                    res.status(err ? 500 : 204).json({
                        result: err ? 'ERROR' : 'OK',
                        instance: hotel,
                        err: err
                    });
                });
            }
        });
    });

    router.delete('/:_id', (req, res) => {
        HotelModel.deleteOne(req.params._id, (err, writeOpResult) => {
            res.status(err ? 404 : 204).json({
                result: err ? 'ERROR' : 'OK',
                writeOpResult: writeOpResult.result,
                err: err
            });
        });
    });

    return router;
}
