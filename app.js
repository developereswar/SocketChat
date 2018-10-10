const express = require('express');
const app = express();

// set view engine
app.set('view engine', 'ejs');

// middlewares
app.use(express.static('public'));

//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)



//socket.io instantiation
const io = require("socket.io")(server)

io.on('connection', (socket) => {
    console.log("Connected socket")
    
    setTimeout(() => {socket.emit('test', { description: 'A custom event named testerEvent!'})}, 2000)

    socket.on('disconnect', ()=>{
        console.log("disconneced")
    })
    
});