const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
var users = [];
var connections = [];

// set view engine
app.set("view engine", "ejs");
// middlewares
app.use(express.static("public"));
//routes

app.get("/", (req, res) => {
  res.render("index");
});

//Listen on port 3000
http.listen(3000);

io.on("connection", (socket) => {
  //default username
	socket.username = "Anonymous"
  //   Sent MSg
  socket.on("chat_msg", msg => {
      console.log(msg.username)
    io.emit("chat_msg", msg);   
  });

  // connect Users
  socket.emit("some event", { for: "everyone" });

  socket.on("new user", data => {
    if (data) users.push(data);
    socket.username = data;
    //   Pass Users list In 
    socket.emit("get users", users );
  });



  socket.on("disconnect", function(data) {
     users.splice(users.indexOf(socket),1)
  });
});
