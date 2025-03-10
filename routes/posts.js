import express from 'express'
import { title } from 'process'

const router = express.Router()

let posts = [
    {id:1, title: 'Post One'},
    {id:2, title: 'Post Two'},
    {id:3, title: 'Post Three'},
]



//get all post
router.get('/', (req,res,next) => {
    const limit = parseInt(req.query.limit)
    if(!isNaN(limit) && limit > 0) {
        return res.json(posts.slice(0,limit))
    } 
        res.json(posts)
})

//get single post
router.get('/:id',(req,res,next) => {
    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id===id)
    if(!post) {
        const error = new Error(`A post with the id of ${id} was not found`)
        res.status(404)
        return next(error)
    }
    res.status(200).json(post)
})

//Create new post
router.post('/',(req,res,next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }

    if (!newPost.title) {
        const error = new Error(`Please include a title`)
        res.status(400)
        return next(error)
    }
    posts.push(newPost)

    res.status(201).json(posts)
})

//update post
router.put('/:id',(req,res,next) => {
    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id===id)
    if(!post) {
        return res.status(404).json({msg: `A posts with the id of ${id} was not found`})
    }
    post.title = req.body.title
    res.status(200).json(posts)
})

//Delete post
router.delete('/:id', (req,res,next) => {
    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id===id)
    if(!post) {
        return res.status(404).json({msg: `A posts with the id of ${id} was not found`})
    }
    posts = posts.filter(post => post.id !== id)
    res.status(200).json(posts)
})

export default router