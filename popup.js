let uIVersion = ''

// Showing ui-kit version
var getUiVers = function(uiVers) {
    uIVersion = uiVers
    document.getElementById('ui-version').innerHTML = uiVers
    document.getElementById('spinner').style.display = 'none'
}

// Send message for get ui-kit version
document.getElementById("button").onclick = function() {
    chrome.extension.sendMessage({
        type: "toggle-grid"
    });
}

// Send message when open popup
window.onload = function() {
    chrome.extension.sendMessage({
        type: "get-ui-version"
    });
    if (!uIVersion) {
        var timerId = setInterval(function() {
            chrome.extension.sendMessage({
                type: "get-ui-version"
            });
          }, 600);
          
          // через 5 сек остановить повторы
          setTimeout(function() {
            clearInterval(timerId);
          }, 10000);
    }
}

// Listener
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
        case "send-ui-version":
            getUiVers(message.data.myProperty);
        break;
    }
});
