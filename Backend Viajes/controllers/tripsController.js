var trip = require('../models/trips');

var tripFunctions = {
    GetTrips: function () {
        return trip.find().exec();
    },

    GetTripsById: function (city) {
        return new Promise((resolve, reject) => {
            return trip.find({ "city.name": city })
                .then(trips => {
                    resolve(trips);
                })
        });
    },

    CreateTrip: function (req) {
        var newTrip = new trip(req.body.trip);
        return newTrip.save();
    },

    UpdateTrip: function (req) {

        return trip.findOneAndUpdate({
            "start.date": new Date(req.body.trip.start.date),
            "passenger.first_name": req.body.trip.passenger.first_name,
            "passenger.last_name": req.body.trip.passenger.last_name
        }, req.body.trip, { multi: true, new: true }).exec();
    }
}


module.exports = tripFunctions;