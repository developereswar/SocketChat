$(() => {
  var socket = io();
  var textBox = $("#Txt");
  var usersname = $("#user");
  var usersubmit = $("#submit");
  var CurrentUser = socket.username;
  var getCurrentUser = "";
  // Send Msg
  textBox.keypress(function(event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      socket.emit("chat_msg", textBox.val());
      textBox.val("");
    }
  });

  //Get Users Msg
  socket.on("chat_msg", msg => {
    if (msg) {
      if (getCurrentUser === CurrentUser) {
        $(".msg_history").append(
          '<div class="outgoing_msg">' +
            '<div class="sent_msg">' +
            "<p>" +
            msg +
            "</p>" +
            "</div>" +
            "</div>"
        );
      } 
    if (getCurrentUser !== CurrentUser) {
        $(".msg_history").append(
          '<div class="received_msg">' +
            '<div class="received_withd_msg">' +
            "<p>" +
            msg +
            "</p>" +
            "</div>" +
            "</div>"
        );
      }
    }
  });

  textBox.bind("keypress", () => {
    socket.emit("typing");
  });

  //Set User Name
  $("#submit").click(() => {
    let username = usersname.val();
    if (username) {
      socket.emit("new user", username);
      $(".usercard").hide();
    }
  });

  socket.on("get users", data => {
    getCurrentUser = data.slice(data.indexOf(CurrentUser), 2);
    getCurrentUser = getCurrentUser[0];
    for (let i = 0; i < data.length; i++) {
      $(".inbox_chat").append(
        '<div class="chat_list active_chat">' +
          '<div class="chat_people">' +
          '<div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>' +
          '<div class="chat_ib">' +
          "<h5>" +
          data[i] +
          '<span class="chat_date"></span></h5>' +
          "</div>" +
          "</div>" +
          "</div>"
      );
    }
  });

  //listen on typing
  socket.on("typing", data => {
    socket.broadcast.emit("typing", { username: socket.username });
  });
});
