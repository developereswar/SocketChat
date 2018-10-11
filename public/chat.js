$(() => {
  var socket = io();
  var textBox = $("#Txt");
  var usersname = $("#user");
  var usersubmit = $("#submit");

  // Send Msg
  textBox.keypress(function(event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      socket.emit("chat_msg", textBox.val());
      textBox.val("");
    }
  });

  //Get Users Msg
  socket.on("chat_msg", (msg) => {
    if (msg) {
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
  });

  //Set User Name
  $("#submit").click(() => {
    let username = usersname.val();
    if (username) {
      socket.emit("new user", username);
      $(".usercard").hide();
    }
  });

  socket.on("get users", (data) => {
     console.log(data)
  });
});
