var uiVersion = ''

// var views = chrome.extension.getViews({
//     type: "popup"
// });
// views[0].document.getElementById('button').innerHTML = "My Custom Value";

// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "color-divs":
            colorDivs();
        break;
        case "ui":
            setUiVers();
        break;
        case "get-ui-version":
            getUiVersion();
        break;
    }
    return true;
});
 
// listening for an event / long-lived connections
// coming from devtools
chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (message) {
        switch(port.name) {
            case "color-divs-port":
                colorDivs();
            break;
        }
    });
});
 
// send a message to the content script
var colorDivs = function() {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {type: "colors-div", color: "#F00"});
        // setting a badge
        chrome.browserAction.setBadgeText({text: "red!"});
    });
}

var setUiVers = function() {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {type: "ui", color: "#F00"});
        // setting a badge
        chrome.browserAction.setBadgeText({text: "red!"});
    });
}

var getUiVersion = function() {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {type: "get-ui-version"});
    });
}