// Showing ui-kit version
var getUiVers = function(uiVers) {
    document.getElementById('ui-version').innerHTML = uiVers
}

// Showing components list
var getComponents = function(components) {
    let componentsList = components.reduce((result, current) => {
        return result + `<a target="_blank" href="${current.pageURL}">${current.title}</a>`
    }, '')

    document.getElementById('links-list').innerHTML = componentsList
}

// Send message for get ui-kit version
document.getElementById("button").onclick = function() {
    chrome.extension.sendMessage({
        type: "color-divs"
    });
}

// Send message for get components list
document.getElementById("show-links-list").onclick = function() {
    chrome.extension.sendMessage({
        type: "show-components"
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
        case "set-components":
            getComponents(message.data.myProperty);
        break;
    }
});
