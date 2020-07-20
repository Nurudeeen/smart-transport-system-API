const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
router.get('/', async (req, res)=>{
	try{
		const posts = await Post.find();
		res.json(posts);
	}catch(err){
		res.json({message:err});
	}
});
router.get('/Status', (req, res)=>{
	res.send('Still in development');
}) 
router.post('/', async(req, res)=>{
console.log(req.body);
const post =new Post({
	title: req.body.title,
	description: req.body.description,
	distance: req.body.distance
});
try{
	const savedPost = await post.save();
	res.json(savedPost);
}catch(err){
	res.json({message: err});
}
});

router.get('/:postId', async (req, res)=> {
	try{
		const post = await Post.findById(req.params.postId);
		res.json(post);
	}catch(err){
		res.json({message: err});
	}
});

router.delete('/:postID',async (req, res)=> {
	try{
		const removedPost = await Post.remove({_Id: req.params.postId});
		res.json(removedPost);
	}catch(err){
		res.json({message: err});
	}
});


router.put('/:postID', (req, res, next) => {
    //updating a post by id
    Post.updateOne({_Id: req.params.postId}, {$set: {title: req.body.distance, body: req.body.body}}, (error, post) => {
        if(error) return res.status(500).json({error: error});
        return res.status(200).json({
            message: 'Post updated',
            updatedPost: post
        });
    });
});
module.exports = router;