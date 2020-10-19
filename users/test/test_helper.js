const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');// initiate connect with mongodb running on our laptop
mongoose.connection
    .once('open', () => console.log('Good to go!'))
    .on('error', (error) => {
        console.warn('Warning', error);
    });