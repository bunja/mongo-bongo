const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({hi: "there"});
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

    }
};