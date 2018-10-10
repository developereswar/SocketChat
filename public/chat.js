$(() => {
    var socket = io.socket('http://localhost:3000');

    var msg = $('#msg');

    socket.on('test', (data)=> {
        document.write(data.description);
    })
})