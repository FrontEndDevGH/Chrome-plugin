let isSelectedWidget = Boolean

// Sending component for shearch when click
document.getElementsByClassName('widgets-wrap')[0].addEventListener('click', (e) => {
    document.getElementById('links-list').innerHTML = ''
    if (e.target.tagName === 'BUTTON') {
        chrome.extension.sendMessage({
            type: "show-components",
            elem: isSelectedWidget ? `productType: '${e.target.innerHTML}'` : e.target.innerHTML
        });
    }
    document.getElementsByClassName("shearch-option")[0].classList.toggle('hide');
    document.getElementsByClassName("shearch-result")[0].classList.toggle('hide');
})

// Open widgets list when click
document.getElementsByClassName("select-widget")[0].onclick = function() {
    document.getElementsByClassName("select-wrap")[0].classList.toggle('hide');
    document.getElementsByClassName("widgets-wrap")[0].classList.toggle('hide');
    document.getElementsByClassName("components-block")[0].classList.add('hide');
    isSelectedWidget = true
}

// Open components list when click
document.getElementsByClassName("select-component")[0].onclick = function() {
    document.getElementsByClassName("select-wrap")[0].classList.toggle('hide');
    document.getElementsByClassName("widgets-wrap")[0].classList.toggle('hide');
    document.getElementsByClassName("widgets-block")[0].classList.add('hide');
    isSelectedWidget = false
}

// Back to widgets list when click
document.getElementsByClassName("button-back")[0].onclick = function() {
    document.getElementsByClassName("shearch-option")[0].classList.toggle('hide');
    document.getElementsByClassName("shearch-result")[0].classList.toggle('hide');
    document.getElementsByClassName("select-wrap")[0].classList.toggle('hide');
    document.getElementsByClassName("widgets-wrap")[0].classList.toggle('hide');
    document.getElementsByClassName("components-block")[0].classList.remove('hide');
    document.getElementsByClassName("widgets-block")[0].classList.remove('hide');
}

// Showing ui-kit version
var getUiVers = function(uiVers) {
    document.getElementById('ui-version').innerHTML = uiVers
}

// Showing components list
var getComponents = function(components) {
    let componentsList = components.reduce((result, current) => {
        return result + `<a title="${current.title}" class="component-item" target="_blank" href="${current.pageURL}">${current.title}</a>`
    }, '')

    document.getElementById('links-list').innerHTML = componentsList
}

// Send message for get ui-kit version
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
        case "set-components":
            getComponents(message.data.myProperty);
        break;
    }
});
