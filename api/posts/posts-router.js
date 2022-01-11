// implement your posts router here
const express = require('express');
const Post = require('./posts-model')

const router = express.Router()

router.get('/', async (req, res) =>{
   const allPosts = await Post.find(req.query)
   try{
      if ( !allPosts ){
         res.status(404).json({ message: 'no users found' })
      } else{
         res.json(allPosts)
      }
   } catch(err){
      res.status(500).json({ message: err.message })
   }
})

module.exports = router