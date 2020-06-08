const sock = io();
var user = {};

console.log("hello world");

sock.on('connected', msg => {
    console.log(msg);
    user.id = msg;
});

sock.on('test', msg => {
    console.table(msg);
});

$('.disconnectMe').click(() => {
    console.log("got here");
    sock.emit('testDisconnect', user.id);
});

sock.on('message', msg => {
    $('body').append("<br>" + msg);
});