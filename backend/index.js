import 'dotenv/config'
import express from 'express'
import { posts } from './dummyDatabase.js'

const app = express()
const PORT = process.env.PORT || 3000

console.log(posts)

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})

export default app
