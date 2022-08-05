const Blog = require('../models/Blog')

function chatBlog(cb){
    Blog.find().lean().sort({ updatedAt: -1 }).limit(15).exec(function(err, blogs) {
        if(err) {
            cb(err)
        } else {
            cb(null, blogs)
        }
    });
};

function messageAdd(data, cb) {
    let newBlog = new Blog(data);

    newBlog.save(function(err, blog) {

        if(err) {
            cb(err);
        } else {
            cb(null, blog);
        }

    });
};
function chatGet(id, cb) {
    Blog.findById(id).exec(function (err, blog) {
        if (err) {
            cb(err)
        } else {
            cb(null, blog)
        }
    })
};

function responseAdd(data, cb) {
    console.log( { response: data[1] });
    Blog.updateOne(
        { _id: data[0] },
        { $push: { responses: data[1] } },
        function (err, blogs) {
            if (err) {
                cb(err)
            } else {
                cb(null, blogs)
            }
        }
    )
};
module.exports={
    list:chatBlog,
    addBlogs:messageAdd,
    response:responseAdd,
    oneBlog:chatGet
}