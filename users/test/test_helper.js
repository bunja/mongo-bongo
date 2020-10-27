const mongoose = require('mongoose');

mongoose.Promise = global.Promise;// because of mongoose deprication warning

before((done) => {
    mongoose.connect('mongodb://localhost/users_test');// initiate connect with mongodb running on our laptop
    mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
        console.warn('Warning', error);
    });
});


beforeEach((done) => {
    const { users, comments, blogposts} = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});