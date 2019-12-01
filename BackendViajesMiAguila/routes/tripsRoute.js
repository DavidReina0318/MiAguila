var express = require('express'),
    router = express.Router();

var tripsController = require('../controllers/tripsController');

const searchTrips = (req, res) => {
    tripsController.GetTrips()
        .then((trips) => {
            return res.status(200).json({
                message: trips
            });
        })
        .catch(function (err) {
            console.log(err);
            return res.status(200).json({
                error: err.message === undefined ? err : err.message
            });
        });
};

const searchTripsByCity = (req, res) => {
    tripsController.GetTripsById(req.params.city)
        .then(trips => {
            return res.status(200).json({
                message: trips
            });
        })
        .catch(function (err) {
            console.log(err);
            return res.status(200).json({
                error: err.message === undefined ? err : err.message
            });
        });
};

const createTrip = (req, res) => {
    var trip = req.body.trip;
    if (trip) {
    tripsController.CreateTrip(req)
        .then(trip => {
            if (trip) {
                return res.status(200).json({
                    message: "Trip created correctly"
                });
            }
            else {
                return res.status(200).json({
                    message: "Trip could not be created"
                });
            }
        })
        .catch(function (err) {
            console.log(err);
            return res.status(200).json({
                error: err.message === undefined ? err : err.message
            });
        });
    }
    else {
        return res.status(200).json({
            message: "Trip not received"
        });
    }
};

const updateTrip = (req, res) => {
    var trip = req.body.trip;
    if (trip) {
        tripsController.UpdateTrip(req)
            .then(trip => {
                if (trip) {
                    return res.status(200).json({
                        message: "Trip updated correctly"
                    });
                }
                else {
                    return res.status(200).json({
                        message: "Trip could not be updated"
                    });
                }
            })
            .catch(function (err) {
                console.log(err);
                return res.status(200).json({
                    error: err.message === undefined ? err : err.message
                });
            });
    }
    else {
        return res.status(200).json({
            message: "Trip not received"
        });
    }
};

router.get('/searchTrips', searchTrips);
router.get('/searchTrips/:city', searchTripsByCity);
router.post('/createTrip', createTrip);
router.patch('/updateTrip', updateTrip);

module.exports = router;