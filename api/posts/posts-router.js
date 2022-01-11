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
      res.status(500).json({ message: err.message })
   }
})

router.get('/:id', async (req, res)=>{
   const { id } = req.params
   const postById = await Post.findById( id )
   try{
      if ( !postById ){
         res.status(404).json({ message: 'this id does not exist'})
      } else {
         res.json( postById )
      }
   } catch(err){
      console.log(`id`, id)
      res.status(500).json({ message: err.message })
   }
})

module.exports = router