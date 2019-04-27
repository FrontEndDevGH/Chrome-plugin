var getUiVers = function() {
    document.getElementById('button').innerHTML = 'but'
}

// Send message when push the button
window.onload = function() {
    document.getElementById("button").onclick = function() {
        chrome.extension.sendMessage({
            type: "color-divs"
        });
    }
}

// Send message when open popup
window.onload = function() {
    chrome.extension.sendMessage({
        type: "get-ui-version"
    });
}

// Listener
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
        case "ui":
            alert(1212);
        break;
    }
});
