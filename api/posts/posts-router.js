// implement your posts router here
const express = require('express');
const Post = require('./posts-model')

const router = express.Router()

// [GET] all posts
router.get('/', async (req, res) =>{
   const allPosts = await Post.find(req.query)
   try{
      if ( !allPosts ){
         res.status(404).json({ message: 'no users found' })
      } else{
         res.json(allPosts)
      }
   } catch(err){
      res.status(500).json({ message: 'The post information could not be retrieved' })
   }
})

router.get('/:id', async (req, res)=>{
   const { id } = req.params
   const postById = await Post.findById( id )
   try{
      if ( !postById ){
         res.status(404).json({ message: 'The post with the specified ID does not exist'})
      } else {
         res.json( postById )
      }
   } catch(err){
      res.status(500).json({ message: 'The post information could not be retrieved' })
   }
})

// [POST]ing new post
router.post('/', async (req, res)=>{
   const { title, contents } = req.body ;
   try{
      if ( title === undefined || contents === undefined ){
         res.status(400).json({ message: 'Please provide title and contents for the post' })
      } else {
         const newPost = await Post.insert(req.body);
         res.status(201).json( newPost )
      }
   } catch(err){
      res.status(500).json({ message: 'There was an error while saving the post to the database' })
   }
});

router.put('/:id', async (req, res)=>{
   const { id } = req.params;
   const { title, contents } = req.body;
   try{
      const dbId = await Post.findById(id)
      if( id === undefined || !dbId ){
         // console.log(`${dbId.id}`)
         res.status(404).json({ message: 'The post with the specified ID does not exist' })
      } else if ( title === undefined || contents === undefined ){
         res.status(400).json({ message: 'Please provide title and contents for the post' })
      } else {
         const updatedPost = await  Post.update(id, req.body);
         res.status(200).json({ updatedPost })
      }
   } catch(err){
      res.status(500).json({ message: 'The post information could not be modified' })
   }
})

module.exports = router