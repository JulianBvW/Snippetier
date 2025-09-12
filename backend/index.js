import 'dotenv/config'

let hello = 'world'

console.log(`Hello, ${hello}!`)

const PORT = process.env.PORT

console.log(`Server is running on port ${PORT}`)
