var getUiVers = function(uiVers) {
    document.getElementById('ui-version').innerHTML = uiVers
}

// Send message when push the button
document.getElementById("button").onclick = function() {
    chrome.extension.sendMessage({
        type: "color-divs"
    });
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
        case "send-ui-version":
            getUiVers(message.data.myProperty);
        break;
    }
});
