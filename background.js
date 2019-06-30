// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "toggle-grid":
            toggleGrid();
        break;
        case "get-ui-version":
            getUiVersion();
        break;
    }
    return true;
});

// send a message to the content script
var toggleGrid = function() {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {type: "toggle-grid"});
        // setting a badge
    });
}

var getUiVersion = function() {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {type: "get-ui-version"});
    });
}
