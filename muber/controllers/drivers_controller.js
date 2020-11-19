const Driver = require('../models/driver');


function geoNear(lng, lat) {
    // return Driver.aggregate([
    //     {
    //       $geoNear: {
    //         near: {
    //           type: 'Point',
    //           coordinates: [lng, lat],
    //         },
    //         spherical: true,
    //         maxDistance: 200000,
    //         distanceField: 'dist.calculated',
    //       }
    //     }
    //   ]);

    return Driver.find({
        "geometry": {
            "$near": {
                "$geometery": {
                    "type": "Point",
                    "coordinates": [lng, lat],
                },
                "$maxDistance": 200000
            }
        }
    });
}


// Model.find({
//     "loc": { 
//         "$near": {
//             "$geometery": {
//                 "type": "Point",
//                 "coordinates": [ 10,10 ],
//             },
//             "$maxDistance": 20
//         }
//     }
// },function(err,docs) {

//     // do something here
// });

module.exports = {
    greeting(req, res) {
        res.send({hi: "there"});
    },

    index(req, res, next) {
        const { lng, lat } = req.query;
        // Driver.geoNear(
        //     { type: 'Point', coordinates}
        // )

        geoNear( lng, lat)
            .then(drivers => res.send(drivers))
            .catch(next);
    },

    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);
    },

    edit(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate({ _id: driverId }, driverProps)// the result of this query is just some statistics about the record, not a record
            .then(() => Driver.findById({ _id: driverId}))
            .then(driver => res.send(driver))
            .catch(next);

    },

    delete(req, res, next) {
        const driverId = req.params.id;

        Driver.findByIdAndRemove({ _id: driverId})
            .then( driver => res.status(204).send(driver))
            .catch(next);
    }
};