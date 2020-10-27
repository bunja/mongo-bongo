const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost'); 

describe('Assosiations', () => {
    let joe, blogPost, comment;
    
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({ title: 'Js is Great', content: 'Yep it is'});
        comment = new Comment({ content: 'Congrats on a great post'});
    
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;
    
        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it.only('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Joe'})
            .populate('blogPosts')
            .then((user) => {
                //console.log(user.blogPosts[0]);
                assert(user.blogPosts[0].title === 'Js is Great');
                done();
            })
    });
    
});