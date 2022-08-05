const express = require("express");
const router = express.Router();
const blog= require('./controllers/blog.controllres');

router.get('/all',function(req,res){
    blog.list(function(err,blogs){
        if(err){
            res.status(404);
            res.json({
                error:"Messages not found"
            });
        }else{
            res.json(blogs)
        }
    })
});

router.post('/add',function(req,res){
    blog.addBlogs(req.body,function(err,blog){
        if(err){
            res.status(404);
            res.json({
                error:'Messages not created'
            })
        }else{
            res.json(blog)
        }
    })
});
router.get('/:id', function (req, res) {
    blog.oneBlog(req.params.id, function (err, blog) {
        if (err) {
            res.status(404);
            res.json({
                error: 'Message blog not found'
            })
        } else {
            res.json(blog)
        }
    })
});


router.put('/addResponse/:id', function (req, res) {
    blog.response([req.params.id, req.body], function (err, blogs) {
        if (err) res.send(err)
        res.json(blogs)
    })
});

module.exports=router