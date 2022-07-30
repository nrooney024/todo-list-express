// Setting up Express app
const express = require('express')
const app = express()

// Setting up MongoDB
const MongoClient = require('mongodb').MongoClient

// What port to listen to
const PORT = 2121

// Configuring the .env file
require('dotenv').config()

// Initializing variables
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

// Connection to actual database
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        
        // Tells you when it successfully connects
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

// Setting dependencies

// Loads EJS
app.set('view engine', 'ejs')

// Sets the public folder - loads on time of servering and you put your assets into it 
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Sends out homepage
app.get('/',async (request, response)=>{
    // pulls everything from the todo database
    const todoItems = await db.collection('todos').find().toArray()
    
    // pulls items that are left by checking which are completed
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

// Creating something to your to-do
app.post('/addTodo', (request, response) => {
    
    // adding a to-do to to-dos
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})

    // if successful
    .then(result => {
        console.log('Todo Added')
        response.redirect('/')
    })
    // if unsuccessful
    .catch(error => console.error(error))
})


// Updating database
app.put('/markComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))

})

app.put('/markUnComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))

})


app.delete('/deleteItem', (request, response) => {
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})