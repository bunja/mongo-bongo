const assert = require('assert');
const request = require('supertest');
const mongoose = request('mongoose');
const app = require('../../app');

//const Driver = mongoose.model('driver');
const Driver = require('../../models/driver');

describe('Drivers controller', () => {
    it('Post to /api/drivers create a new driver', done => {
        Driver.count().then(count => {
            request(app)
                .post('/api/drivers') // make a post req
                .send({ email: 'test@test.com'}) // also send along this obj to the server 
                .end(() => {
                    Driver.count().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });
});
