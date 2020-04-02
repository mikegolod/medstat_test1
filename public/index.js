document.addEventListener('DOMContentLoaded', loaded);


function loaded() {
    var wsUrl = `ws://${document.location.host}/`;
    var button = document.getElementById('increment');
    var counter = document.getElementById('counter');

    var ws = new WebSocket(wsUrl);
    installListeners(ws, { button, counter, wsUrl });
}

function installListeners(ws, options) {
    var counter = undefined;
    var sendNumber = function (e) {
        ws.send(++counter);
    }
    ws.addEventListener('open', function(event) {
        options.counter.innerText = 'Waiting for number';
        options.button.addEventListener('click', sendNumber);
    });

    ws.addEventListener('message', function(message) {
        console.log('received', message.data);
        counter = parseInt(message.data);
        options.counter.innerText = counter;
        options.button.removeAttribute('disabled');
    });

    ws.addEventListener('close', function(event) {
        if (!event.wasClean) {
            options.button.removeEventListener('click', sendNumber);
            options.button.setAttribute('disabled', true);
            options.counter.innerText = 'Trying to reconnect...';
            setTimeout(function () {
                installListeners(new WebSocket(options.wsUrl), options);
            }, 5000);
        }
    });

}

