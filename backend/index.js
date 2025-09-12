import 'dotenv/config'
import express from 'express'
import { posts } from './dummyDatabase.js'
import cors from 'cors'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())

// ==========
// API Routes
// ==========

// Get all posts
app.get('/posts', (req, res) => {
    res.json(posts)
})

// Get a specific post by ID
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id)
    const post = posts.find((p) => p.id == postId)

    if (!post) {
        return res.status(404).json({ error: 'Post not found' })
    }

    res.json(post)
})

// Create a new post
app.post('/posts', (req, res) => {
    const { title, body } = req.body

    const newPost = {
        id: posts.length + 1,
        author: 'anonymous',
        title,
        body,
        created_at: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        comments: [],
    }

    posts.push(newPost)
    res.status(201).json(newPost)
})

// Add a comment to a post
app.post('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id)
    const post = posts.find((p) => p.id == postId)

    if (!post) {
        return res.status(404).json({ error: 'Post not found' })
    }

    const { body } = req.body

    const newComment = {
        id: post.comments.length + 1,
        author: 'anonymous',
        body,
        created_at: new Date().toISOString(),
    }

    post.comments.push(newComment)
    res.status(201).json(newComment)
})

// Like a post
app.post('/posts/:id/like', (req, res) => {
    const postId = parseInt(req.params.id)
    const post = posts.find((p) => p.id == postId)

    if (!post) {
        return res.status(404).json({ error: 'Post not found' })
    }

    post.likes += 1
    res.json({ likes: post.likes })
})

// Dislike a post
app.post('/posts/:id/dislike', (req, res) => {
    const postId = parseInt(req.params.id)
    const post = posts.find((p) => p.id == postId)

    if (!post) {
        return res.status(404).json({ error: 'Post not found' })
    }

    post.dislikes += 1
    res.json({ dislikes: post.dislikes })
})

// Start server

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})

export default app
