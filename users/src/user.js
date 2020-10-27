const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = require('./post');

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required.']//user friendly error messege
    },
    posts: [PostSchema],//subdocuments
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

// this function will run before any user is removed
UserSchema.pre('remove', function(next){
    // this === joe
    const BlogPost = mongoose.model('blogPost');
    BlogPost.remove({ _id: { $in: this.blogPosts}})
        .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;