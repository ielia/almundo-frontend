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
        }], // May need to go somewhere else
        rooms: [{ beds: { doubles: Number, singles: Number } }], // Will require an availability service.
        price: {
            currency: { type: String, enum: ['ARS'], required: true }, // Will require currency-exchange service.
            amount: { type: Number, min: 0, required: true }
        }, // Should go in a different service (such as the 'availability' service).
        discount: { type: Number, min: 0, max: 1 }, // Needs a promotion service.
        paymentTypes: [{ type: String, enum: ['inst', 'dest'] }] // 'installments', 'at destination'.
    }),
    HotelModel = mongoose.model('hotel', HotelSchema);

export default HotelModel;
