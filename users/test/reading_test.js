const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe, maria, alex, zach;

    beforeEach((done) => {
        alex = new User({ name: 'Alex'});
        maria = new User({ name: 'Maria'});
        joe = new User({ name: 'Joe'});
        zach = new User({ name: 'Zach'});

        Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
            .then(() => done());
    });

    it('Finds all users with a name of Joe', (done) => {
        User.find({ name: 'Joe'})
            .then((users) => {
                console.log(users[0]._id, joe._id);
                assert(users[0]._id.toString === joe._id.toString);
                done();
            });
    });

    it('find a user with a particular id', (done) => {
        User.findOne({_id: joe._id})
            .then((user) => {
                assert(user.name === 'Joe');
                done();
            })
    });

    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort({ name: 1})//sort users by the name in the ascending order
            .skip(1)
            .limit(2)
            .then((users) => {
                console.log(users);
                assert(users.length === 2)
                assert(users[0].name === 'Joe');
                assert(users[1].name === 'Maria');
                done();
            });
    });
});