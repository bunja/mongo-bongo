const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {

    it('can create a subdocument', (done) => {
        const joe = new User({ 
            name: 'Joe', 
            posts: [{ title: 'PostTitle'}]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            });
            
    });

    it('Can add subdocuments into existing records', (done) => {
        const joe = new User({ 
            name: 'Joe', 
            posts: []
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                user.posts.push({ title: 'New Post'});
                return user.save();// because we need to chain another then we need to return a promise from save
            })
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            });

    })

    it('Can remove an existing an existing subdocument', (done) => {
        const joe = new User({ 
            name: 'Joe', 
            posts: [{ title: 'New Title'}]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                //user.posts[0].remove();
                const post = user.posts[0];
                post.remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });

    });
});