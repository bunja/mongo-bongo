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

    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Joe'})
            .populate('blogPosts')
            .then((user) => {
                //console.log(user.blogPosts[0]);
                assert(user.blogPosts[0].title === 'Js is Great');
                done();
            })
    });

    it('saves full relation graph', (done) => {
        User.findOne({ name: 'Joe'})    //find user with name Joe
            .populate({
                path: 'blogPosts',      // in that user find blogPosts property and load associated blog posts
                populate: {             //inside of these blogPosts that you just fetched 
                    path: 'comments',    //find the comments property and load up all the associated comments
                    model: 'comment',    //use model comment for it
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                //console.log(user.blogPosts[0].comments[0]);
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'Js is Great');
                assert(user.blogPosts[0].comments[0].content === 'Congrats on a great post');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            })
    });
    
});