const sock = io();

function writeEvent(text) {
    // <ul> element
    const parent = document.querySelector('#events');

    // <li> element
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
}

function onFormSubmitted(e) {
    e.preventDefault();
    var input = document.querySelector('#chat');
    var text = input.value;
    input.value = '';

    if(text) {
        sock.emit('message', text);
    }
}

writeEvent("~~~~~~~~");

sock.on('message', (text) => {
    writeEvent(text);
    updateScroll();
});

document.querySelector("#chat-form").addEventListener('submit', (e) => {
    onFormSubmitted(e);
});

sock.on('test', text => {
    console.log("usersArray",text);
});

function updateScroll() {
    var element = document.getElementById("events");
    element.scrollTop = element.scrollHeight;
}

sock.on('lose', () => {
    $('#lose').show();
});

sock.on('win', () => {
    $('#win').show();
});

$("#winbtn").click(function() {
    console.log("aa");
    sock.emit('win');
});