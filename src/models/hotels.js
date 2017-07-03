import mongoose from 'mongoose';

const Schema = mongoose.Schema,
    HotelSchema = new Schema({
        created: { type: Date, default: Date.now },
        updated: Date,
        name: { type: String, required: true, trim: true },
        location: {
            address: { type: String, required: true, trim: true },
            city: { type: String, required: true, trim: true },
            country: { type: String, required: true, trim: true },
            lat: { type: Number, max: 90, min: -90, required: true },
            lng: { type: Number, max: 180, min: -180, required: true }
        },
        stars: { type: Number, max: 5, min: 0, required: true },
        image: { type: String, required: true },
        amenities: [{
            type: String, enum: ['bar', 'beach', 'cafe', 'desk24x7', 'gym', 'room-svc', 'tv', 'wifi']
        }], // This might need to go somewhere else
        price: {
            currency: { type: String, enum: ['ARS', 'USD'], required: true },
            amount: { type: Number, min: 0, required: true }
        } // This should go in another model or even in a different service
    }),
    HotelModel = mongoose.model('hotel', HotelSchema);

export default HotelModel;
