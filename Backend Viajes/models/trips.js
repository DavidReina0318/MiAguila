var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tripSchema = new Schema({
    start: {
        date: { type: Schema.Types.Date, required: true },
        pickup_address: { type: Schema.Types.String, required: true },
        pickup_location: {
            type: { type: Schema.Types.String, required: true },
            coordinates: [ Schema.Types.Number ]
        }
    },
    end: {
        date: { type: Schema.Types.Date, required: true },
        pickup_address: { type: Schema.Types.String, required: true },
        pickup_location: {
            type: { type: Schema.Types.String, required: true },
            coordinates: [Schema.Types.Number]
        }
    },
    country: {
        name: { type: Schema.Types.String, required: true }
    },
    city: {
        name: { type: Schema.Types.String, required: true }
    },
    passenger: {
        first_name: { type: Schema.Types.String, required: true },
        last_name: { type: Schema.Types.String, required: true }
    },
    driver: {
        first_name: { type: Schema.Types.String, required: true },
        last_name: { type: Schema.Types.String, required: true }
    },
    car: {
        plate: { type: Schema.Types.String, required: true }
    },
    status: { type: Schema.Types.String, required: true },
    check_code: { type: Schema.Types.String, required: true },
    price: { type: Schema.Types.Number, required: true },
    driver_location: {
        type: { type: Schema.Types.String, required: true },
        coordinates: [Schema.Types.Number]
    }
}, { timestamps: true });

var Trip = mongoose.model('trips', tripSchema, 'Trips');
module.exports = Trip;