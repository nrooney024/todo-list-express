// Initializing event listeners

const deleteBtn = document.querySelectorAll('.fa-trash')
const item = document.querySelectorAll('.item span')
const itemCompleted = document.querySelectorAll('.item span.completed')

// Setting up event listeners to call each function at click
Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

Array.from(item).forEach((element)=>{
    element.addEventListener('click', markComplete)
})

Array.from(itemCompleted).forEach((element)=>{
    element.addEventListener('click', markUnComplete)
})

// Deletes item from the database, it's an async function because it needs to wait until it gets the response from the server
async function deleteItem(){
    // Pulling what is being deleted
    const itemText = this.parentNode.childNodes[1].innerText
    // In a try catch block in case it doesn't work
    try{
        // Sending request to server through fetch
        const response = await fetch('deleteItem', {
            // telling which CRUD method
            method: 'delete',
            // Telling what kind of request file
            headers: {'Content-Type': 'application/json'},
            // What's inside the request file 
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
        // Waiting for a response from the server
        const data = await response.json()
        // The response from the server
        console.log(data)
        // Reloading to show the updates
        location.reload()
    // Logging any errors, if it doesn't work
    }catch(err){
        console.log(err)
    }
}

// Updating item as completed from the database, it's an async function because it needs to wait until it gets the response from the server
async function markComplete(){
    // pulling what's being set to complete
    const itemText = this.parentNode.childNodes[1].innerText
    // In a try catch block in case it doesn't work
    try{
        // Sending request to server through fetch
        const response = await fetch('markComplete', {
            // telling which CRUD method
            method: 'put',
            // Telling what kind of request file
            headers: {'Content-Type': 'application/json'},
            // What's inside the request file 
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        // Waiting for a response from the server
        const data = await response.json()
        // The response from the server
        console.log(data)
        // Reloading to show the updates
        location.reload()
    // Logging any errors, if it doesn't work
    }catch(err){
        console.log(err)
    }
}

// Updating item as completed from the database, it's an async function because it needs to wait until it gets the response from the server
async function markUnComplete(){
    // pulling what's being set to incomplete
    const itemText = this.parentNode.childNodes[1].innerText
    // In a try catch block in case it doesn't work
    try{
        // Sending request to server through fetch
        const response = await fetch('markUnComplete', {
            // telling which CRUD method
            method: 'put',
            // Telling what kind of request file
            headers: {'Content-Type': 'application/json'},
            // What's inside the request file 
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        // Waiting for a response from the server
        const data = await response.json()
        // The response from the server
        console.log(data)
        // Reloading to show the updates
        location.reload()
    // Logging any errors, if it doesn't work
    }catch(err){
        console.log(err)
    }
}